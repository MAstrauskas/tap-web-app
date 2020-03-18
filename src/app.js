const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

const user = require("./resources/User/User.route");
const task = require("./resources/Task/Task.route");
const mood = require("./resources/Mood/Mood.route");

const CronJob = require("cron").CronJob;
const User = require("./resources/User/User.model");
const Task = require("./resources/Task/Task.model");

const app = express();

app.use(bodyParser.json());

// DB Config
const db = require("./config/options").dbTestUrl;

// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.use(express.static(path.join(__dirname, "../client/build")));

// Use Routes
app.use("/api/user", user);
app.use("/api/tasks", task);
app.use("/api/mood", mood);

// Handles any requests that don't match the ones above
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "client/build/index.html"));
});

// CRON Job that clears all of the users
// moods and suggested tasks at midnight
// each day. This way we can reset
// the suggestion and mood systems
// so that the users can add a new
// mood and get new suggested tasks
// each day.
const job = new CronJob(
  "00 00 00 * * *",
  function() {
    // Clear All Users Moods
    User.find({}, function(err, doc) {
      doc.forEach(user => {
        user.userMood = undefined;
        user.userProductivity = undefined;

        user.save();
      });
    });

    // Clear All Users Suggested Tasks
    Task.find({}, function(err, doc) {
      doc.forEach(task => {
        task.isTaskSuggested = false;

        task.save();
      });
    });
  },
  null,
  true,
  "Europe/London"
);

job.start();

module.exports = app;
