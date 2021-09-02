const { User, Comment, Trip, Activity, Checklist } = require("./Trip_Schema");
const Invite = require("./Invite");
const Session = require("./Session");
const Trips_Activities = require("./Trips_Activities");
const Trips_Users = require("./Trips_Users");
const Verification = require("./Verification");

module.exports = {
  User,
  Comment,
  Activity,
  Invite,
  Session,
  Trip,
  Trips_Activities,
  Trips_Users,
  Verification,
  Checklist,
};
