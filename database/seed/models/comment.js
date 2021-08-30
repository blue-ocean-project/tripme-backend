const lorem = require("../config");

module.exports = (activity_id, user_id) => {
  return {
    body: lorem.generateParagraphs(1),
    activity_id: activity_id + 1,
    user_id: user_id + 1,
  };
};
