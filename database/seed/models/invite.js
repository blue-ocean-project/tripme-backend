// const lorem = require('../config');
const hash = require("../../../server/lib/hashUtils");

module.exports = (trip_id) => {
  return {
    trip_id,
    key: hash.createRandom32String(),
  };
};
