const router = require('express').Router();
const loginRouter = require('./login');
const movieRouter = require('./movie');
const userRouter = require('./user');
const { auth } = require('../middlewares/auth');

router.use('/', loginRouter);
router.use(auth);
router.use('/users', userRouter);
router.use('/movies', movieRouter);

module.exports = router;
