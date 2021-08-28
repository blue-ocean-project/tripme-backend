const router = require('express').Router();

const authRouter = require('./auth');
const signupRouter = require('./signup');
const inviteRouter = require('./invite');
const tripsRouter = require('./trips');
const eventsRouter = require('./events');
const commentsRouter = require('./comments');

router.use('/auth', authRouter);
router.use('/signup', signupRouter);
router.use('/invite', inviteRouter);
router.use('/trips', tripsRouter);
router.use('/events', eventsRouter);
router.use('/comments', commentsRouter);

module.exports = router;
