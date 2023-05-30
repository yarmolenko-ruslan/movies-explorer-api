const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movie');

const standardValidationTemplate = Joi.string().required();

// возвращает все фильмы данного пользователя
router.get('/', getMovies);
// создает фильм
router.post('/', celebrate({
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
  }),
}), createMovie);
// удаляет фильм
router.delete(
  '/movies/:_id',
  celebrate({
    params: Joi.object().keys({
      cardId: standardValidationTemplate.hex().length(24),
    }),
  }),
  deleteMovie,
);

module.exports = router;
