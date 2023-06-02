const router = require('express').Router();
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movie');
const { createMovieValidation, deleteMovieValidation } = require('../utils/validation');



// возвращает все фильмы данного пользователя
router.get('/', getMovies);
// создает фильм
router.post('/', createMovieValidation, createMovie);
// удаляет фильм
router.delete(
  '/movies/:_id', deleteMovieValidation, deleteMovie
);

module.exports = router;
