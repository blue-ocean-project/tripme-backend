const { DataTypes } = require("sequelize");
const db = require("../index");

const Event = db.define(
  "Event",
  {
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    trip_id: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: false,
      defaultValue: [],
    },
  },
  {
    tableName: "events",
  }
);

module.exports = Event;
