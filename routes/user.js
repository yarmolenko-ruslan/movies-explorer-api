const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUsersMe, updateUsersInfo,
} = require('../controllers/user');

// возвращает информацию о пользователе
router.get('/users/me', getUsersMe);

// обновляет информацию о пользователе
router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
}), updateUsersInfo);

module.exports = router;
