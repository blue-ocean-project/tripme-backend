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
    const { trip_id } = req.params;
    const { type, name, image_url, description, date, duration } = req.body;
    Activity.create({
      type,
      name,
      image_url,
      description,
      date,
      duration,
      trip_id,
    })
      .then((result) => {
        res.status(201).send({ id: result.dataValues.id });
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
