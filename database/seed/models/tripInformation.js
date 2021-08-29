const User = require("./user");
const Trip = require("./trip");
const Activity = require("./activity");
const Comment = require("./comment");

// const Verification = require("./verification");
// const Session = require("./session");
// const Invite = require("./invite");

const mathRandom = (n) => Math.floor(Math.random() * n);

// users
const n_users = 10;
const userArray = [];
for (let i = 0; i < n_users; i++) {
  userArray.push(User(i));
}

console.log(userArray);

// trips
const n_trips = 20;
const tripArray = [];
for (let i = 0; i < n_trips; i++) {
  tripArray.push(Trip());
}

// activities
const n_activities = 50;
const activityArray = [];
for (let i = 0; i < n_activities; i++) {
  let tripId = mathRandom(n_trips);
  let trip = tripArray[tripId];
  activityArray.push(Activity(tripId, trip.tripStartms, trip.tripDurationms));
}

// comments
const n_comments = 100;
const commentArray = [];
for (let i = 0; i < n_comments; i++) {
  let activityId = mathRandom(n_activities);
  let userId = mathRandom(n_users);
  commentArray.push(Comment(activityId, userId));
}

module.exports = { userArray, tripArray, activityArray, commentArray };
