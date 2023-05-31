const router = require('express').Router();
const { login, createUser, logout } = require('../controllers/user');
const { loginValidation, createUserValidation } = require('../utils/validation');

router.post('/signin', loginValidation, login);
router.post('/signup', createUserValidation, createUser);
router.post('/signout', logout);

module.exports = router;
