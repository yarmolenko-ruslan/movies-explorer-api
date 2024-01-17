require('dotenv').config();

const { PORT = 3001, JWT_SECRET = 'super-secret-key', DATABASE_URL = 'mongodb://localhost:27017/moviesdb' } = process.env;

const JWT_STORAGE_TIME = '7d';
const SALT_LENGTH = 10;

module.exports = {
  PORT,
  JWT_SECRET,
  DATABASE_URL,
  SALT_LENGTH,
  JWT_STORAGE_TIME,
};
