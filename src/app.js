import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import path from "path";

import jwt from "express-jwt";
import jwks from "jwks-rsa";

import user from "./resources/User/User.route";
import task from "./resources/Task/Task.route";
import mood from "./resources/Mood/Mood.route";
import admin from "./resources/Admin/Admin.route";

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

// Connect to MongoDB
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_URL}/${process.env.DB_ENV_PROD}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
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
