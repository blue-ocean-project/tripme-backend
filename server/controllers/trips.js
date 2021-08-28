const models = require("../../database/models");

module.exports = {
  getTrips: (req, res) => {
    res.status(200).json("get trips");
  },
  createTrip: (req, res) => {
    res.status(200).json("create trip");
  },
  tripDetail: (req, res) => {
    res.status(200).json("get trip detail");
  },
  updateTrip: (req, res) => {
    res.status(200).json("edit trip");
  },
};
