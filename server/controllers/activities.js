const { Activity, Comment, User } = require("../../database/models");
const getActivities = require("../lib/getActivity");

module.exports = {
  getActivities: (req, res) => {
    const { trip_id } = req.params;
    getActivities(trip_id)
      .then((data) => res.status(200).json(data))
      .catch((error) => res.status(404).send(error));
  },
  createActivity: (req, res) => {
    res.status(200).json("create activity");
  },
  updateActivity: (req, res) => {
    res.status(200).json("update activity");
  },
};
