const { Activity, Comment, User } = require("../../database/models");
const Trips_Activities = require("../../database/models/Trips_Activities");
const getActivities = require("../lib/getActivity");

module.exports = {
  getActivities: (req, res) => {
    const { trip_id } = req.params;
    getActivities(trip_id)
      .then((data) => res.status(200).json(data))
      .catch((error) => res.status(404).send(error));
  },
  createActivity: (req, res) => {
    const { trip_id } = req.params;
    const { type, title, image_url, description, start_date, end_date } =
      req.body;
    Activity.create({
      type: type || "",
      title: title || "",
      image_url: image_url || "",
      description: description || "",
      start_date: start_date || "",
      end_date: end_date || "",
      trip_id,
    })
      .then((result) => {
        const activity_id = result.dataValues.id;
        Trips_Activities.create({
          trip_id,
          activity_id,
        })
          .then((result) => {
            res.status(201).send({ activity_id });
          })
          .catch((error) => {
            throw error;
          });
      })
      .catch((error) => {
        res.status(404).send(error);
      });
  },
  updateActivity: async (req, res) => {
    const allowedFields = [
      "type",
      "title",
      "description",
      "image_url",
      "start_time",
      "end_time",
    ];
    try {
      const activity = await Activity.findOne({
        where: { id: req.params.activity_id },
      });
      const changes = {};
      if (activity) {
        for (const field in req.body) {
          if (allowedFields.includes(field)) {
            changes[field] = req.body[field];
          }
        }
        await Activity.update(changes, {
          where: { id: req.params.activity_id },
        });
        res.sendStatus(204);
      } else {
        res.status(404).send("Activity not found");
      }
    } catch (err) {
      res.status(500).send("Internal Server Error: " + err);
    }
  },
};
