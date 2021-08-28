const { Sequelize, DataTypes } = require('sequelize');

const { database, user, password, host, dialect } = require('./config/config.database');

const sequelize = new Sequelize(database, user, password, {
  host,
  dialect,
  logging: false,
});

const User = sequelize.define(
  'User',
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unqiue: true,
      primaryKey: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'pending',
    },
    first: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    trips: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      defaultValue: [],
    },
    availability: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      defaultValue: [],
    },
  },
  {
    tableName: 'users',
  },
);

const Trip = sequelize.define(
  'Trip',
  {
    destination: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    startDate: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    users: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      defaultValue: [],
    },
  },
  {
    tableName: 'trips',
  },
);

const Event = sequelize.define(
  'Event',
  {
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    comments: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'events',
  },
);

sequelize.sync();

module.exports = { User, Trip, Event };
