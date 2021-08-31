const lorem = require("../config");

const minHours = 1;
const maxHours = 5;
const delta = maxHours - minHours;
const hr2ms = 1 * 60 * 60 * 1000;

module.exports = (trip_id, tripStart, tripDuration) => {
  const tripDate = tripStart + Math.random() * tripDuration; // ms
  const duration = Math.ceil(Math.random() * delta * hr2ms);
  return {
    type: lorem.generateWords(1),
    title: lorem.generateWords(1),
    description: lorem.generateParagraphs(1),
    start_time: new Date(tripDate), // date
    end_time: new Date(tripDate + duration), // ms
    trip_id: trip_id + 1,
  };
};
