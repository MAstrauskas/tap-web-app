import mongoose from "mongoose";

const Schema = mongoose.Schema;

const MoodSchema = new Schema({
  email: {
    // User Email
    type: String,
    ref: "User",
    required: true
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
    required: false
  },
  finalMood: {
    type: String,
    required: false
  }
});

module.exports = mongoose.model("Mood", MoodSchema);
