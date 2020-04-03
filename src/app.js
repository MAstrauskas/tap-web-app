import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import path from "path";

import authorize from "./authorize";

import user from "./resources/User/User.route";
import task from "./resources/Task/Task.route";
import mood from "./resources/Mood/Mood.route";
import admin from "./resources/Admin/Admin.route";

import "core-js/stable";
import "regenerator-runtime/runtime";

require("dotenv").config();

// Authentication & Authorizatioin
if (!process.env.AUTH0_DOMAIN || !process.env.AUTH0_AUDIENCE) {
  throw "Make sure you have AUTH0_DOMAIN, and AUTH0_AUDIENCE in your .env file";
}

// Authentication middleware that verifies if
// the token provided is a correct one.
// Skips this check for tests
const authMiddleware =
  process.env.NODE_ENV !== "test" ? authorize() : (req, res, next) => next();

// Connect to MongoDB
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_URL}/${process.env.DB_ENV_PROD}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "../client/build")));
app.use("/api/user", authMiddleware, user);
app.use("/api/tasks", authMiddleware, task);
app.use("/api/mood", authMiddleware, mood);
app.use("/api/admin", admin);
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "client/build/index.html"));
});

module.exports = app;
