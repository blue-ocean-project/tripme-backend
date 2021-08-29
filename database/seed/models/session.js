// const lorem = require('../config');
const hash = require("../../../lib/hashUtils");

module.exports = () => {
  return {
    session_hash: hash.createRandom32String(),
  };
};
