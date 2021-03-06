import mongoose from "mongoose";

const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  email: {
    // User Email
    type: String,
    ref: "User",
    required: true
  },
  taskName: {
    type: String,
    required: true
  },
  taskDescription: {
    type: String,
    required: false
  },
  taskCreateDate: {
    type: Date,
    required: true
  },
  taskUpdateDate: {
    type: Date,
    required: false
  },

  taskDueDate: {
    type: Date,
    required: true
  },
  taskPriority: {
    type: String,
    required: true
  },
  taskDifficulty: {
    type: String,
    required: true
  },
  isTaskComplete: {
    type: Boolean,
    required: true
  },
  isTaskSuggested: {
    type: Boolean,
    required: true
  },
  taskGroup: {
    type: Number,
    required: false
  },
  taskTotalPoints: {
    type: Number,
    required: false
  },
  taskCompleteDate: {
    type: Date,
    required: false
  }
});

module.exports = mongoose.model("Task", TaskSchema);
