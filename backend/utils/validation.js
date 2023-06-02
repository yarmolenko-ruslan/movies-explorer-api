const { celebrate, Joi } = require('celebrate');

const standardValidationTemplate = Joi.string().required();
const createMovieValidation = celebrate({
  body: Joi.object().keys({
    country: standardValidationTemplate,
    director: standardValidationTemplate,
    duration: Joi.number().required(),
    year: standardValidationTemplate,
    description: standardValidationTemplate,
    image: standardValidationTemplate.pattern(/https?:\/\/(www\.)?([\w-]+\.)+\w+[\w\-._~:/?#[\]@!$&'()*,;=]*/),
    trailerLink: standardValidationTemplate.pattern(/https?:\/\/(www\.)?([\w-]+\.)+\w+[\w\-._~:/?#[\]@!$&'()*,;=]*/),
    nameRU: standardValidationTemplate,
    nameEN: standardValidationTemplate,
    thumbnail: standardValidationTemplate.pattern(/https?:\/\/(www\.)?([\w-]+\.)+\w+[\w\-._~:/?#[\]@!$&'()*,;=]*/),
    movieId: Joi.number().required(),
  })
});

const deleteMovieValidation = celebrate({
  params: Joi.object().keys({
    cardId: standardValidationTemplate.hex().length(24),
  }),
});

const loginValidation = celebrate({
  body: Joi.object().keys({
    email: standardValidationTemplate.email(),
    password: standardValidationTemplate,
  }),
});

const createUserValidation = celebrate({
  body: Joi.object().keys({
    name: standardValidationTemplate.min(2).max(30),
    email: standardValidationTemplate.email(),
    password: standardValidationTemplate,
  }),
});

const patchUserValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().required().email(),
  }),
});

module.exports = { createMovieValidation, deleteMovieValidation, loginValidation, createUserValidation, patchUserValidation };