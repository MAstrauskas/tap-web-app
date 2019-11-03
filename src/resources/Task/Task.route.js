const express = require("express");
const router = express.Router();

const TaskController = require("./Task.controller");

/**
 * @route GET api/tasks
 * @desc Get All Tasks
 * @access Public
 **/
router.get("/", TaskController.taskList);

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
// router.get("/add", TaskController.addTask_get);

// /**
//  * @route POST api/tasks/add
//  * @desc POST request for creating and adding a Task
//  * @access Public
//  **/
router.post("/add", TaskController.addTask_post);

// /**
//  * @route GET api/tasks/id/edit
//  * @desc GET request for editing a Task
//  * @access Public
//  **/
// router.get("/:id/edit", TaskController.editTask_get);

// /**
//  * @route POST api/tasks/id/edit
//  * @desc POST request for editing a Task
//  * @access Public
//  **/
// router.post("/:id/edit", TaskController.editTask_post);

// /**
//  * @route GET api/tasks/id/delete
//  * @desc GET request for deleting a Task
//  * @access Public
//  **/
// router.get("/:id/delete", TaskController.deleteTask_get);

// /**
//  * @route POST api/tasks/id/delete
//  * @desc POST request for deleting a Task
//  * @access Public
//  **/
// router.post("/:id/delete", TaskController.deleteTask_post);

module.exports = router;
