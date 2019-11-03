const express = require("express");
const router = express.Router();

const Task = require("./Task.model");
const TaskController = require("./Task.controller");

/**
 * @route GET api/tasks
 * @desc Get All Tasks
 * @access Public
 **/
router.get("/", (req, res) => {
  Task.find().then(tasks => res.json(tasks));

  // TODO Change to TaskController.taskList
});

/**
 * @route GET api/tasks/id
 * @desc GET request for one Task
 * @access Public
 **/
router.get("/:id", TaskController.taskDetail);

/**
 * @route GET api/tasks/add
 * @desc GET request for creating and adding a Task
 * @access Public
 **/
router.get("/add", TaskController.addTask_get);

/**
 * @route POST api/tasks/add
 * @desc POST request for creating and adding a Task
 * @access Public
 **/
router.post("/add", (req, res) => {
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

  // TODO Change to TaskController.addTask_post
});

/**
 * @route GET api/tasks/id/edit
 * @desc GET request for editing a Task
 * @access Public
 **/
router.get("/:id/edit", TaskController.editTask_get);

/**
 * @route POST api/tasks/id/edit
 * @desc POST request for editing a Task
 * @access Public
 **/
router.post("/:id/edit", TaskController.editTask_post);

/**
 * @route GET api/tasks/id/delete
 * @desc GET request for deleting a Task
 * @access Public
 **/
router.get("/:id/delete", TaskController.deleteTask_get);

/**
 * @route POST api/tasks/id/delete
 * @desc POST request for deleting a Task
 * @access Public
 **/
router.post("/:id/delete", TaskController.deleteTask_post);

module.exports = router;
