const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movie');

// возвращает все фильмы данного пользователя
router.get('/', getMovies);
// создает фильм
router.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(/https?:\/\/(www\.)?([\w-]+\.)+\w+[\w\-._~:/?#[\]@!$&'()*,;=]*/),
    trailerLink: Joi.string().required().pattern(/https?:\/\/(www\.)?([\w-]+\.)+\w+[\w\-._~:/?#[\]@!$&'()*,;=]*/),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    thumbnail: Joi.string().required().pattern(/https?:\/\/(www\.)?([\w-]+\.)+\w+[\w\-._~:/?#[\]@!$&'()*,;=]*/),
    movieId: Joi.number().required(),
  }),
}), createMovie);
// удаляет фильм
router.delete(
  '/movies/:_id',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().required().hex().length(24),
    }),
  }),
  deleteMovie,
);

module.exports = router;
