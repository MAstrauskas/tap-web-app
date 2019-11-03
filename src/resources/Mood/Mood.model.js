const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MoodSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  moodName: {
    type: String,
    required: true
  },
  moodType: {
    type: String,
    required: true
  },
  finalMood: {
    type: String,
    required: true
  }
});

module.exports = Mood = mongoose.model("Mood", MoodSchema);
