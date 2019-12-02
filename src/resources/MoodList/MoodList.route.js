const express = require("express");
const router = express.Router();

const MoodListController = require("./MoodList.controller");

/**
 * @route GET api/moodlist/
 * @desc GET request for all moods
 * @access Public
 **/
router.get("/", MoodListController.allMoods);

/**
 * @route POST api/moodlist/add
 * @desc POST request for adding moods
 * @access Public
 **/
router.post("/add", MoodListController.addToMoodList);

module.exports = router;
