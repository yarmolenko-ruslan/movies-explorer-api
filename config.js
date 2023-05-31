const { PORT = 3000, JWT_SECRET = 'super-secret-key' } = process.env;
const MONGOOSE_URL = 'mongodb://localhost:27017/bitfilmsdb';
const JWT_STORAGE_TIME = '7d';
const SALT_LENGTH = 10;

const allowedCors = [
  'https://movies.explorer.nomoredomains.rocks',
  'http://movies.explorer.nomoredomains.rocks',
  'http://localhost:3000',
  'https://localhost:3000',
];

module.exports = {
  PORT,
  JWT_SECRET,
  MONGOOSE_URL,
  SALT_LENGTH,
  JWT_STORAGE_TIME,
  allowedCors
};
