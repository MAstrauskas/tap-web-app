const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
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
    required: false
  },
  taskPriority: {
    type: String,
    required: false
  },
  taskDifficulty: {
    type: String,
    required: false
  },
  isTaskComplete: {
    type: Boolean,
    required: true
  },
  isTaskSuggested: {
    type: Boolean,
    required: true
  }
});

module.exports = Task = mongoose.model("Task", TaskSchema);