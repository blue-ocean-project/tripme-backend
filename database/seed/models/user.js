const hash = require("../../../lib/hashUtils");
const lorem = require("../config");

const phoneMin = 1000000000;
const phoneMax = 9999999999;
const phoneDelta = phoneMax - phoneMin;

module.exports = () => {
  return {
    email: `${lorem.generateWords(1)}@${lorem.generateWords(1)}.com`,
    phone: Math.floor(Math.random() * phoneDelta + phoneMin),
    password: hash.createHash("password"),
    first: lorem.generateWords(1),
    last: lorem.generateWords(1),
  };
};
