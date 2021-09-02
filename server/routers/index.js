const router = require("express").Router();

const authRouter = require("./auth");
const signupRouter = require("./signup");
const inviteRouter = require("./invite");
const tripsRouter = require("./trips");
const activityRouter = require("./activities");
const commentsRouter = require("./comments");
const checklistRouter = require("./checklist");

router.use("/auth", authRouter);
router.use("/signup", signupRouter);
router.use("/invite", inviteRouter);
router.use("/trips", tripsRouter);
router.use("/activities", activityRouter);
router.use("/comments", commentsRouter);
router.use("/checklists", checklistRouter);

module.exports = router;
