import express from "express";
import AdminController from "./Admin.controller";

const router = express.Router();

/**
 * @route POST api/admin/clear-suggest
 * @desc POST Clear Suggested tasks
 **/
router.post("/clear-suggest", AdminController.clearSuggested_post);

/**
 * @route GET api/admin/clear-mood
 * @desc GET Clear the mood of all the users
 */
router.get("/clear-mood", AdminController.clearMood_get);

module.exports = router;
