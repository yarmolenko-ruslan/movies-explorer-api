require('dotenv').config();
const express = require('express');

const app = express();
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const { PORT, MONGOOSE_URL } = require('./devConfig');

const iternalServerError = require('./errors/iternalServerError');
const { NOT_FOUND_ERROR } = require('./errors/notFoundError');

const router = require('./routes/index');
const { cors } = require('./middlewares/cors');
const { limiter } = require('./utils/rateLimit');
const { requestLogger, errorLogger } = require('./middlewares/logger');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);
app.use(limiter);
app.use(cors);
app.use(router);

app.use((req, res, next) => {
  next(new NOT_FOUND_ERROR('Запрашиваемый ресурс не найден'));
});

app.use(errorLogger);

app.use(errors());

app.use(iternalServerError);

async function main() {
  await mongoose.connect(process.env.MONGOOSE_URL || MONGOOSE_URL);
  console.log('Сервер подключен к базе данных');

  await app.listen(process.env.PORT || PORT);
  console.log(`Сервер слушает запросы на ${process.env.PORT || PORT} порту...`);
}

main();
