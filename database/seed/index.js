const DatabaseModels = require("../models");
const tripInformation = require("./models/tripInformation");

DatabaseModels.User.bulkCreate(tripInformation.userArray);
DatabaseModels.Trip.bulkCreate(tripInformation.tripArray);
DatabaseModels.Activity.bulkCreate(tripInformation.activityArray);
DatabaseModels.Comment.bulkCreate(tripInformation.commentArray);
DatabaseModels.Trips_Activities.bulkCreate(tripInformation.tripActivityArray);
DatabaseModels.Trips_Users.bulkCreate(tripInformation.tripUserArray);
