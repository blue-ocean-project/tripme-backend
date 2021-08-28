const router = require("express").Router();
const controllers = require("../controllers/activities");

/* ================================
          /activities
================================ */
router.get("/trips/:trip_id", controllers.getActivities);
router.post("/trips/:trip_id", controllers.createActivity);
router.patch("/:activity_id", controllers.updateActivity);

module.exports = router;
