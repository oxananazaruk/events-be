const express = require("express");
const cors = require("cors");
const moment = require("moment");
const fs = require("fs/promises");
require("dotenv").config();

const eventsRouter = require("./routes/api/events.js");
const participantsRouter = require("./routes/api/participants.js");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.set("json spaces", 4);

app.use(async (req, res, next) => {
  const { method, url } = req;
  const date = moment().format("DD-MM-YYYY_hh:mm:ss");
  await fs.appendFile("./public/server.log", `\n ${method} ${url} ${date}`);
  next();
});

app.use("/api/events", eventsRouter);
app.use("/api/participants", participantsRouter);

app.use((req, res) => {
  res.status(404).json({
    message: "Not found",
  });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
