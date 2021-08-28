const router = require('express').Router();
const controllers = require('../controllers/invite');

/* ================================
          /invite
================================ */
router.post('/', controllers.createInvite);
router.get('/:trip_id', controllers.verifyInvite);

module.exports = router;
