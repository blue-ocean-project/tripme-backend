const lorem = require("../config");

module.exports = (trip_id) => {
  const checked = Math.random() > 0.65;
  return {
    item: lorem.generateSentences(1),
    checked,
    trip_id: trip_id + 1,
  };
};
