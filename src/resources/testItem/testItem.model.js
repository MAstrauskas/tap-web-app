const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const testItemSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = testItem = mongoose.model("testItem", testItemSchema);
