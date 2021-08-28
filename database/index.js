const { Sequelize, DataTypes } = require("sequelize");

const {
  database,
  user,
  password,
  host,
  dialect,
} = require("./config/config.database");

const sequelize = new Sequelize(database, user, password, {
  host,
  dialect,
  logging: false,
});

const Session = sequelize.define(
  "Session",
  {
    created_at: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    updated_at: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "users",
  }
);

const Verification = sequelize.define(
  "Verification",
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    key: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "users",
  }
);

const User = sequelize.define(
  "User",
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unqiue: true,
      primaryKey: true,
    },
    phone: {
      type: DataTypes.STRING,
      unqiue: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    salt: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    verified: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "pending",
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_last: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profile_pic: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    availability: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      defaultValue: [],
    },
  },
  {
    tableName: "users",
  }
);

const Trip = sequelize.define(
  "Trip",
  {
    destination: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    start_date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    end_date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "trips",
  }
);

const Event = sequelize.define(
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

const Comment = sequelize.define(
  "Comment",
  {
    body: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    event_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "comments",
  }
);

const Invite = sequelize.define(
  "Invite",
  {
    trip_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    key: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "invites",
  }
);

const Trips_Users = sequelize.define(
  "Trips_Users",
  {
    trip_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "trips_users",
  }
);

const TRIPS_EVENTS = sequelize.define(
  "Trips_Events",
  {
    trip_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    event_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "trips_events",
  }
);

sequelize.sync();

module.exports = { User, Trip, Event };
