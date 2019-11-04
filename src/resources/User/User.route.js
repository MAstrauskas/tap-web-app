const express = require("express");
const router = express.Router();

const User = require("./User.model");

/**
 * @route GET api/user
 * @desc Get All Users
 * @access Public
 **/
router.get("/", (req, res) => {
  User.find().then(users => res.json(users));
});

/**
 * @route POST api/user/add
 * @desc POST An Item To The DB
 * @access Public
 **/
router.post("/add", (req, res) => {
  const fullName = req.body.fullName.split(" ");

  const newUser = new User({
    userId: 1,
    firstName: fullName[0],
    lastName: fullName[1],
    emailAddress: req.body.emailAddress,
    password: req.body.password, // TODO: HASH password later,
    userMood: req.body.userMood
  });

  newUser.save().then(user => res.json(user));
});

module.exports = router;
