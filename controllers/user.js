const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { JWT_STORAGE_TIME, SALT_LENGTH, JWT_SECRET } = require('../tokenGeneration');
const { errorMessage } = require('../utils/errorMessage');
const { NOT_FOUND_ERROR } = require('../errors/notFoundError');
const { CREATED, OK } = require('../utils/successes');

// возвращает информацию о пользователе
module.exports.getUsersMe = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      throw new NOT_FOUND_ERROR('Пользователь с таким id не найден');
    })
    .then((user) => {
      const userWithoutPassword = user;
      userWithoutPassword.password = undefined;
      res.status(OK).send(userWithoutPassword);
    })
    .catch((err) => errorMessage(err, req, res, next));
};

// обновляет информацию о пользователе
module.exports.updateUsersInfo = (req, res, next) => {
  const { name, email } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(userId, { name, email }, { new: true, runValidators: true })
    .orFail(() => {
      throw new NOT_FOUND_ERROR('Пользователь с таким id не найден');
    })
    .then((user) => res.send(user))
    .catch((err) => errorMessage(err, req, res, next));
};

// создаёт пользователя
module.exports.createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;

  bcrypt.hash(password, SALT_LENGTH)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((user) => {
      const userWithoutPassword = user;
      userWithoutPassword.password = undefined;
      res.status(CREATED).send(userWithoutPassword);
    })
    .catch((err) => errorMessage(err, req, res, next));
};

// получает по запросу почту или пароль и проверяет их
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: JWT_STORAGE_TIME,
      });
      res.send({ jwt: token });
    })
    .catch(next);
};
