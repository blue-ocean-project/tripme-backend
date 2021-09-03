var Op = require("sequelize").Op;
const {
  Activity,
  Comment,
  User,
  Trip,
  Checklist,
} = require("../../database/models");
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
    console.log("create trip user_id: ", user_id);
    Trip.create({ user_id, destination, start_date, end_date })
      .then((result) => {
        const trip_id = result.dataValues.id;
        Trips_Users.create({ user_id, trip_id })
          .then((result) => {
            res.status(201).send({ user_id, trip_id });
          })
          .catch((error) => {
            throw error;
          });
      })
      .catch((error) => {
        res.status(404).send(error);
      });
  },
  tripDetail: (req, res) => {
    const { trip_id } = req.params;
    console.log("detail for trip_id: ", trip_id);
    Trip.findOne({
      attributes: [
        "id",
        "destination",
        "name",
        "image_url",
        "start_date",
        "end_date",
      ],
      where: { id: trip_id },
    })
      .then((tripInfo) => {
        getActivities(trip_id)
          .then((activities) => {
            Trips_Users.findAll({
              attributes: ["user_id"],
              where: {
                trip_id,
              },
            })
              .then((userIdArray) => {
                const userIdList = userIdArray.reduce((accumulator, userId) => {
                  accumulator.push(userId.dataValues.user_id);
                  return accumulator;
                }, []);

                const userList = User.findAll({
                  where: {
                    id: {
                      [Op.in]: userIdList,
                    },
                  },
                  attributes: ["id", "first_name", "last_name", "profile_pic"],
                }).then((user) => user);

                const checklistList = Checklist.findAll({
                  attributes: ["id", "item", "checked"],
                  where: {
                    trip_id,
                  },
                });

                Promise.all([userList, checklistList])
                  .then((usersChecklist) => {
                    const users = usersChecklist[0];
                    const checklist = usersChecklist[1];
                    if (tripInfo) {
                      const outputObj = tripInfo.dataValues;
                      res.status(200).json({
                        ...outputObj,
                        activities,
                        users,
                        checklist,
                      });
                    } else {
                      const outputObj = {};
                      res.status(200).json({
                        ...outputObj,
                        activities,
                        users,
                        checklist,
                      });
                    }
                  })
                  .catch((error) => {
                    throw error;
                  });
              })
              .catch((error) => {
                throw error;
              });
          })
          .catch((error) => res.status(404).send(error));
      })
      .catch((error) => {
        res.status(500).send("Server error.");
      });
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
