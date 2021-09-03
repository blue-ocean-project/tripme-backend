require("dotenv").config({ path: "../.env" });
const express = require("express");
const cors = require("cors");
const cookies = require("cookie-parser");
const routes = require("./routers");
const db = require("../database");
const models = require("../database/models");
const cookieParser = require("cookie-parser");
const moment = require("moment");

const HOST = "0.0.0.0";
const PORT = 3000;

const squawk = (req, res, next) => {
  const body = JSON.stringify(req.body);
  console.log(
    `${moment(new Date() - 7 * 60 * 60 * 1000).format("M/D h:mma")} ${
      req.method
    } ${req.originalUrl}`
  );
  if (body) {
    console.log(`\t${body}`);
  }
  next();
};

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookies());
app.use(cookieParser());

app.use("/", squawk, routes);

db.sync()
  .then(() => {
    app.listen(PORT, HOST, () =>
      console.log(`Server listening on http://${HOST}:${PORT}`)
    );
  })
  .catch((error) => console.error(error));
