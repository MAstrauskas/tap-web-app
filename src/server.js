const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const testItem = require("./resources/testItem/testItem.route");
const user = require("./resources/User/User.route");
const task = require("./resources/Task/Task.route");

const app = express();

app.use(bodyParser.json());

// DB Config
// !!! Change to dbUrl for production
const db = require("./config/options").dbTestUrl;

// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Use Routes
app.use("/api/testItem", testItem);
app.use("/api/user", user);
app.use("/api/tasks", task);

const port = process.env.PORT || 9000;

app.listen(port, () => console.log(`Server started on port ${port}`));
