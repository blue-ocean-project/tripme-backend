const router = require("express").Router();
const controllers = require("../controllers/signup");

/* ================================
          /signup
================================ */
router.post("/", controllers.signup);
router.get("/verify", controllers.verify);
router.get("/verify/sendCode", controllers.sendCode);

module.exports = router;
