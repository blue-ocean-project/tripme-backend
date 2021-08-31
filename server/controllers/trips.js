const { Activity, Comment, User, Trip } = require("../../database/models");
const { Trips_Users } = require("../../database/models");

module.exports = {
  getTrips: (req, res) => {
    const { user_id } = req.body;
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
    res.status(200).json("create trip");
  },
  tripDetail: (req, res) => {
    res.status(200).json("get trip detail");
  },
  updateTrip: (req, res) => {
    res.status(200).json("edit trip");
  },
};
