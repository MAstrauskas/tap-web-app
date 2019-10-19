const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const testItem = require("./resources/testItem/testItem.route");

const app = express();

app.use(bodyParser.json());

// DB Config
const db = require("./config/options").dbUrl;

// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Use Routes
app.use("/api/testItem", testItem);

const port = process.env.PORT || 9000;

app.listen(port, () => console.log(`Server started on port ${port}`));
