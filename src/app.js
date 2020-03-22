const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

const jwt = require("express-jwt");
const jwks = require("jwks-rsa");

const user = require("./resources/User/User.route");
const task = require("./resources/Task/Task.route");
const mood = require("./resources/Mood/Mood.route");
const admin = require("./resources/Admin/Admin.route");

const app = express();

require("dotenv").config();

// Authentication & Authorizatioin
if (!process.env.AUTH0_DOMAIN || !process.env.AUTH0_AUDIENCE) {
  throw "Make sure you have AUTH0_DOMAIN, and AUTH0_AUDIENCE in your .env file";
}

const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
  }),
  audience: process.env.AUTH0_AUDIENCE,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithms: ["RS256"]
});

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
app.use("/api/user", jwtCheck, user);
app.use("/api/tasks", jwtCheck, task);
app.use("/api/mood", jwtCheck, mood);
app.use("/api/admin", admin);

// Handles any requests that don't match the ones above
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "client/build/index.html"));
});

module.exports = app;
