const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const { UNAUTHORIZED_ERROR } = require('../errors/errors');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [2, 'Минимальное количество символов 2, сейчас {VALUE}'],
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email) => validator.isEmail(email),
      message: 'Неверный формат почты',
    },
  },
  password: {
    type: String,
    required: [true, 'Это поле должно быть заполнено'],
    minlength: 8,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = (email, password) => this.findOne({ email })
  .select('+password')
  .then((user) => {
    if (!user) {
      throw new UNAUTHORIZED_ERROR('Неправильные почта или пароль');
    }

    return bcrypt.compare(password, user.password).then((matched) => {
      if (!matched) {
        throw new UNAUTHORIZED_ERROR('Неправильные почта или пароль');
      }

      return user;
    });
  });

module.exports = mongoose.model('user', userSchema);
