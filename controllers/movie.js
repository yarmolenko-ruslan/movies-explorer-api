const Movie = require('../models/movie');
const { errorMessage } = require('../utils/errorMessage');
const { NOT_FOUND_ERROR } = require('../errors/notFoundError');
const { FORBIDDEN_ERROR } = require('../errors/forbiddenError');
const { CREATED } = require('../utils/successes');

// возвращает все сохранённые текущим  пользователем фильмы
module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movie) => res.send({ data: movie }))
    .catch((err) => errorMessage(err, req, res, next));
};

// создаёт фильм
module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    movieId,
    nameRU,
    nameEN,
    thumbnail,
  } = req.body;
  const ownerId = req.user._id;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    movieId,
    nameRU,
    nameEN,
    thumbnail,
    owner: ownerId,
  })
    .then((movie) => res.status(CREATED).send({ data: movie }))
    .catch((err) => errorMessage(err, req, res, next));
};

// удаляет карточку по идентификатору
module.exports.deleteMovieById = (req, res, next) => {
  Movie.findById(req.params._id)
    .orFail(() => {
      throw new NOT_FOUND_ERROR('Карточка с таким id не найдена');
    })
    .then((movie) => {
      if (!movie.owner.equals(req.user._id)) {
        throw new FORBIDDEN_ERROR('Эту карточку нельзя удалить');
      }
      return Movie.findByIdAndRemove(req.params._id);
    })
    .then((movie) => res.send({ data: movie }))
    .catch((err) => errorMessage(err, req, res, next));
};
