const router = require("express").Router();
const controllers = require("../controllers/comments");

/* ================================
          /comments
================================ */
router.get("/activities/:activity_id", controllers.getComments);
router.post("/activities/:activity_id", controllers.createComment);
router.patch("/:comment_id", controllers.updateComment);

module.exports = router;
