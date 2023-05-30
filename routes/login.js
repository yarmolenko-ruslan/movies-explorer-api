const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { login, createUser } = require('../controllers/user');

const standardValidationTemplate = Joi.string().required();

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: standardValidationTemplate.email(),
    password: standardValidationTemplate,
  }),
}), login);

router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: standardValidationTemplate.min(2).max(30),
    email: standardValidationTemplate.email(),
    password: standardValidationTemplate,
  }),
}), createUser);

module.exports = router;
