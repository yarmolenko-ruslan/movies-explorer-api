const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const { PORT, MONGOOSE_URL } = require('./tokenValue');

const iternalServerError = require('./errors/iternalServerError');

const { NOT_FOUND_ERROR } = require('./errors/notFoundError');
const { auth } = require('./middlewares/auth');
const { cors } = require('./middlewares/cors');
const { limiter } = require('./utils/rateLimit');

const { requestLogger, errorLogger } = require('./middlewares/logger');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);
app.use(limiter);

app.use(cors);
app.use(require('./routes/login'));

app.use(auth);
app.use(require('./routes/movie'));
app.use(require('./routes/user'));

app.use((req, res, next) => {
  next(new NOT_FOUND_ERROR('Запрашиваемый ресурс не найден'));
});

app.use(errorLogger);

app.use(errors());

app.use(iternalServerError);

async function main() {
  await mongoose.connect(MONGOOSE_URL);
  console.log('Сервер подключен к базе данных');

  await app.listen(PORT);
  console.log(`Сервер слушает запросы на ${PORT} порту...`);
}

main();
