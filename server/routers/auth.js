const router = require('express').Router();
const controllers = require('../controllers/auth');

/* ================================
          /auth
================================ */
router.post('/login', controllers.login);
router.post('/session', controllers.createSession);
router.delete('/session', controllers.deleteSession);

module.exports = router;
