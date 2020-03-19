const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

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

app.use(express.static(path.join(__dirname, "../client/build")));

// Use Routes
app.use("/api/user", user);
app.use("/api/tasks", task);
app.use("/api/mood", mood);

// Handles any requests that don't match the ones above
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "client/build/index.html"));
});

module.exports = app;
