const lorem = require("../config");

const min = 1000000000000; // ms
const max = 2000000000000; // ms
const delta = max - min;

const maxDuration = 5; // days
const day2ms = 1 * 24 * 60 * 60 * 1000;

module.exports = () => {
  const start = Math.random() * delta + min; // ms
  const duration = Math.random() * maxDuration * day2ms; // ms
  let city = lorem.generateWords(1);
  city = city[0].toUpperCase() + city.slice(1);
  let country = lorem.generateWords(1);
  country = country[0].toUpperCase() + country.slice(1);
  return {
    tripStartms: start,
    tripDurationms: duration,
    name: lorem.words(4),
    destination: `${city}, ${country}`,
    start_date: new Date(start),
    end_date: new Date(start + duration),
  };
};
