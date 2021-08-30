const DatabaseModels = require("../models");
const tripInformation = require("./models/tripInformation");

const sync = async () => {
  await DatabaseModels.User.bulkCreate(tripInformation.userArray);
  await DatabaseModels.Trip.bulkCreate(tripInformation.tripArray);
  await DatabaseModels.Activity.bulkCreate(tripInformation.activityArray);
  await DatabaseModels.Comment.bulkCreate(tripInformation.commentArray);
  await DatabaseModels.Trips_Activities.bulkCreate(
    tripInformation.tripActivityArray
  );
  await DatabaseModels.Trips_Users.bulkCreate(tripInformation.tripUserArray);
};

sync();
