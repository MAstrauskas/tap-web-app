const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MoodListSchema = new Schema({
  moodName: {
    type: String,
    required: true
  },
  moodGroup: {
    type: String,
    required: true
  }
});

module.exports = MoodList = mongoose.model("MoodList", MoodListSchema);
