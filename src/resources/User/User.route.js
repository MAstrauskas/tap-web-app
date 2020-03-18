const express = require("express");
const router = express.Router();

const UserController = require("./User.controller");

/**
 * @route GET api/user
 * @desc Get All Users
 * @access Public
 **/
router.get("/", UserController.userList);

/**
 * @route GET api/user/single/email
 * @desc Get a Single User
 * @access Public
 **/
router.get("/single/:email", UserController.userGet);

/**
 * @route POST api/user/add
 * @desc POST An Item To The DB
 * @access Public
 **/
router.post("/add", UserController.addUser_post);

module.exports = router;
