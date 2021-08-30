const lorem = require("../config");
const hash = require("../../../server/lib/hashUtils");

module.exports = () => {
  return {
    email: `${lorem.generateWords(1)}@${lorem.generateWords(1)}.com`,
    key: hash.createRandom32String(),
  };
};
