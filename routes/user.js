const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { getUser, patchUser } = require('../controllers/user');

// возвращает информацию о текущем пользователе
router.get('/me', getUser);
// обновляет информацию о текущем пользователе
router.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30).required(),
      email: Joi.string().required().email(),
    }),
  }),
  patchUser,
);

module.exports = router;
