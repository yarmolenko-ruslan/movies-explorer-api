const jwt = require('jsonwebtoken');
const { UNAUTHORIZED_ERROR } = require('../errors/errors');
const { JWT_SECRET } = require('../config');

function auth(req, res, next) {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res
      .status(UNAUTHORIZED_ERROR)
      .send({ message: 'Авторизируйтесь, пожалуйста' });
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, process.env.JWT_SECRET || JWT_SECRET);
  } catch (err) {
    return res
      .status(UNAUTHORIZED_ERROR)
      .send({ message: 'Авторизируйтесь, пожалуйста' });
  }

  req.user = payload;

  return next();
}

module.exports = { auth };
