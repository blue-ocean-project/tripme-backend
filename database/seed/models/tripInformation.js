const User = require("./user");
const Trip = require("./trip");
const Activity = require("./activity");
const Comment = require("./comment");
const Checklist = require("./checklist");

const mathRandom = (n) => Math.floor(Math.random() * n);

// users
const n_users = 10;
const userArray = [];
for (let i = 0; i < n_users; i++) {
  userArray.push(User());
}

// trips
const n_trips = 20;
const fullTripArray = [];
for (let i = 0; i < n_trips; i++) {
  fullTripArray.push(Trip());
}

// activities
const n_activities = 50;
const activityArray = [];
const tripActivityArray = [];
for (let i = 0; i < n_activities; i++) {
  let tripId = mathRandom(n_trips);
  let trip = fullTripArray[tripId];
  activityArray.push(Activity(tripId, trip.tripStartms, trip.tripDurationms));
  tripActivityArray.push({ trip_id: tripId + 1, activity_id: i + 1 });
}

const tripArray = [];
for (let i = 0; i < fullTripArray.length; i++) {
  const { destination, name, start_date, end_date } = fullTripArray[i];
  tripArray.push({ destination, name, start_date, end_date });
}

// comments
const n_comments = 100;
const commentArray = [];
const tripUserArray = [];
for (let i = 0; i < n_comments; i++) {
  let activityId = mathRandom(n_activities);
  let userId = mathRandom(n_users);
  commentArray.push(Comment(activityId, userId));
  tripUserArray[activityArray[activityId].trip_id - 1] = {
    user_id: userId + 1,
    trip_id: activityArray[activityId].trip_id,
  };
}

for (let i = 0; i < n_trips; i++) {
  if (tripUserArray[i] === undefined) {
    let user_id = mathRandom(n_users) + 1;
    tripUserArray[i] = { user_id, trip_id: i + 1 };
  }
}

// checklist
const n_checklist = 100;
const checklistArray = [];
for (let i = 0; i < n_checklist; i++) {
  let trip_id = mathRandom(n_trips);
  checklistArray.push(Checklist(trip_id));
}

module.exports = {
  userArray,
  tripArray,
  activityArray,
  commentArray,
  tripActivityArray,
  tripUserArray,
  checklistArray,
};
