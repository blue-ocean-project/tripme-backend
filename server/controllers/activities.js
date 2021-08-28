const models = require("../../database/models");

module.exports = {
  getActivities: (req, res) => {
    res.status(200).json("get activities");
  },
  createActivity: (req, res) => {
    res.status(200).json("create activity");
  },
  updateActivity: (req, res) => {
    res.status(200).json("update activity");
  },
};
