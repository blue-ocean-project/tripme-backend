const router = require('express').Router();
const controllers = require('../controllers/events');

/* ================================
          /events
================================ */
router.get('/trips/:trip_id', controllers.getEvents);
router.post('/trips/:trip_id', controllers.createEvent);
router.patch('/:event_id', controllers.updateEvent);

module.exports = router;
