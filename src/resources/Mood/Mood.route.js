import express from "express";
import MoodController from "./Mood.controller";

const router = express.Router();

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
