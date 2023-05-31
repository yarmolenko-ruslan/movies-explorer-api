const router = require('express').Router();
const { getUser, patchUser } = require('../controllers/user');
const { patchUserValidation } = require('../utils/validation');

// возвращает информацию о текущем пользователе
router.get('/me', getUser);
// обновляет информацию о текущем пользователе
router.patch(
  '/me', patchUserValidation, patchUser,
);

module.exports = router;
