const router = require("express").Router();
const controllers = require("../controllers/checklist");

/* ================================
          /checklists
================================ */
router.get("/trip/:trip_id", controllers.getChecklist);
router.post("/trip/:trip_id", controllers.createChecklist);
router.patch("/:item_id", controllers.updateChecklist);

module.exports = router;
