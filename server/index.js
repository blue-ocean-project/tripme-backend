require("dotenv").config({ path: "../.env" });
const express = require("express");
const cors = require("cors");
const cookies = require("cookie-parser");
const router = require("./routers");

const HOST = "0.0.0.0";
const PORT = 3000;

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookies());
app.use("/", router);

app.listen(PORT, HOST, () =>
  console.log(`Server listening on http://${HOST}:${PORT}`)
);
