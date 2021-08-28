const router = require('express').Router();
const controllers = require('../controllers/signup');

/* ================================
          /signup
================================ */
router.post('/', controllers.signup);
router.get('/verify', controllers.verify);
router.get('/verify/code', controllers.code);

module.exports = router;
