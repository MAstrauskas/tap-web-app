const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const user = require("./resources/User/User.route");
const task = require("./resources/Task/Task.route");
const mood = require("./resources/Mood/Mood.route");

const app = express();

app.use(bodyParser.json());

// DB Config
const db = require("./config/options").dbTestUrl;

// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  next();
});

// Use Routes
app.use("/api/user", user);
app.use("/api/tasks", task);
app.use("/api/mood", mood);

module.exports = app;
