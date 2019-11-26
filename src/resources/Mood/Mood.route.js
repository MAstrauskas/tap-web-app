const express = require("express");
const router = express.Router();

const MoodController = require("./Mood.controller");

/**
 * @route GET api/mood/id
 * @desc GET request for a specific mood
 * @access Public
 **/
router.get("/:id", MoodController.moodDetail);

/**
 * @route POST api/mood/add
 * @desc POST request for creating and adding a Mood
 * @access Public
 **/
router.post("/add", MoodController.addMood_post);

module.exports = router;
