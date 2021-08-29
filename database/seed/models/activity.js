const lorem = require("../config");

const minHours = 1;
const maxHours = 5;
const delta = maxHours - minHours;
const hr2ms = 1 * 60 * 60 * 1000;

module.exports = (trip_id, tripStart, tripDuration) => {
  const tripDate = tripStart + Math.random() * tripDuration; // ms
  return {
    type: lorem.generateWords(1),
    name: lorem.generateWords(1),
    date: new Date(tripStart + Math.random() * tripDuration), // date
    duration: Math.ceil(Math.random() * delta * hr2ms), // ms
    trip_id,
  };
};
