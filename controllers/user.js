const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { handlerMessageError } = require('../utils/handlerMessageError');
const { NOT_FOUND_ERROR } = require('../errors/notFoundError');
const { JWT_STORAGE_TIME, SALT_LENGTH, JWT_SECRET } = require('../config');
const { CREATED, OK } = require('../utils/successes');

// получить текущего пользователя
const getUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      throw new NOT_FOUND_ERROR('Пользователь с таким id не найден');
    })
    .then((user) => res.status(OK).send(user))
    .catch((err) => handlerMessageError(err, req, res, next));
};
// обновить текущего пользователя
const patchUser = (req, res, next) => {
  const { name, email } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(
    userId,
    { name, email },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      throw new NOT_FOUND_ERROR('Пользователь с таким id не найден');
    })
    .then((user) => res.send(user))
    .catch((err) => handlerMessageError(err, req, res, next));
};
// создать пользователя
const createUser = (req, res, next) => {
  const { name, email, password } = req.body;

  bcrypt
    .hash(password, SALT_LENGTH || process.env.SALT_LENGTH)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((user) => res.status(CREATED).send({ data: user }))
    .catch((err) => handlerMessageError(err, req, res, next));
};
// авторизация пользователя
const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET || JWT_SECRET, {
        expiresIn: process.env.JWT_STORAGE_TIME || JWT_STORAGE_TIME,
      });
      res.send({ jwt: token });
    })
    .catch(next);
};

module.exports = {
  getUser, patchUser, createUser, login,
};
