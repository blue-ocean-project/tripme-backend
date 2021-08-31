const { Activity, Comment, User, Trip } = require("../../database/models");
const { Trips_Users } = require("../../database/models");
const getActivities = require("../lib/getActivity");

module.exports = {
  getTrips: (req, res) => {
    const { user_id } = req.query;
    Trips_Users.findAll({
      attributes: ["trip_id"],
      where: {
        user_id,
      },
    })
      .then((userTrips) => {
        const tripArray = [];
        userTrips.forEach((trip) => {
          tripArray.push(
            Trip.findAll({
              attributes: [
                "id",
                "name",
                "destination",
                "image_url",
                "start_date",
                "end_date",
              ],
              where: { id: trip.dataValues.trip_id },
            }).then((tripInfo) => tripInfo[0])
          );
        });

        Promise.all(tripArray)
          .then((trips) => {
            const past = [];
            const upcoming = [];
            trips.forEach((tripObj) => {
              const triptime = Date.parse(tripObj.dataValues.start_date);
              if (triptime < Date.now()) {
                past.push(tripObj);
              } else {
                upcoming.push(tripObj);
              }
            });

            res.status(200).json({ upcoming, past });
          })
          .catch((error) => res.status(404).send(error));
      })
      .catch((error) => res.status(404).send(error));
  },
  createTrip: (req, res) => {
    const { user_id, destination, start_date, end_date } = req.body;
    Trip.create({ user_id, destination, start_date, end_date })
      .then((result) => {
        res.status(201).send({ id: result.dataValues.id });
      })
      .catch((error) => {
        res.status(404).send(error);
      });
  },
  tripDetail: (req, res) => {
    const { trip_id } = req.params;

    getActivities(trip_id)
      .then((activities) => {
        Trips_Users.findAll({
          attributes: ["user_id"],
          where: {
            trip_id,
          },
        })
          .then((userIdArray) => {
            let usersOnly = [];
            userIdArray.forEach((userId) => {
              usersOnly.push(
                User.findAll({
                  where: { id: userId.dataValues.user_id },
                }).then((user) => user)
              );
            });

            Promise.all(usersOnly).then((users) => {
              res.status(200).json({ trip_id, activities, users: users[0] });
            });
          })
          .catch((error) => {
            throw error;
          });
      })
      .catch((error) => res.status(404).send(error));
  },
  updateTrip: async (req, res) => {
    const allowedFields = [
      "name",
      "destination",
      "image_url",
      "start_date",
      "end_date",
    ];
    try {
      const trip = await Trip.findOne({
        where: { id: req.params.trip_id },
      });
      const changes = {};
      if (trip) {
        for (const field in req.body) {
          if (allowedFields.includes(field)) {
            changes[field] = req.body[field];
          }
        }
        await Trip.update(changes, {
          where: { id: req.params.trip_id },
        });
        res.sendStatus(204);
      } else {
        res.status(404).send("Trip not found");
      }
    } catch (err) {
      res.status(500).send("Internal Server Error: " + err);
    }
  },
};
