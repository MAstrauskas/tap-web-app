const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MoodSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: false // TODO Change to true when users are available
  },
  moodName: {
    type: String,
    required: true
  },
  moodMotivation: {
    type: String,
    required: true
  },
  isTired: {
    type: Boolean,
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
