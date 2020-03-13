const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  userMood: {
    type: String,
    required: false
  },
  userProductivity: {
    type: Number,
    required: false
  }
});

module.exports = mongoose.model("User", UserSchema);
