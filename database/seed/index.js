const DatabaseModels = require("../models");
const tripInformation = require("./models/tripInformation");

DatabaseModels.User.bulkCreate(tripInformation.userArray);
