const router = require('express').Router();
const controllers = require('../controllers/trips');

/* ================================
          /trips
================================ */
router.get('/', controllers.getTrips);
router.post('/', controllers.createTrip);
router.patch('/:trip_id', controllers.updateTrip);

module.exports = router;
