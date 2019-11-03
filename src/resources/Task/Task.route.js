const express = require("express");
const router = express.Router();

const Task = require("./Task.model");

/**
 * @route GET api/tasks
 * @desc Get All Tasks
 * @access Public
 **/
router.get("/", (req, res) => {
  Task.find().then(tasks => res.json(tasks));
});

/**
 * @route POST api/tasks
 * @desc POST An Item To The DB
 * @access Public
 **/
router.post("/", (req, res) => {
  const newTask = new Task({
    userId: req.body.userId,
    taskName: req.body.taskName,
    taskDescription: req.body.taskDescription,
    taskCreateDate: req.body.taskCreateDate,
    taskUpdateDate: req.body.taskUpdateDate,
    taskDueDate: req.body.taskDueDate,
    taskPriority: req.body.taskPriority,
    taskDifficulty: req.body.taskDifficulty,
    isTaskComplete: req.body.isTaskComplete,
    isTaskSuggested: req.body.isTaskSuggested
  });

  newTask.save().then(task => res.json(task));
});

module.exports = router;
