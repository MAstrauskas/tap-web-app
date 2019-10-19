const express = require("express");
const router = express.Router();

// testItem Model
const TestItem = require("./testItem.model");

/**
 * @route GET api/testItem
 * @desc Get All Test Items
 * @access Public
 **/
router.get("/", (req, res) => {
  TestItem.find()
    .sort({ date: -1 }) // -1 - Descending
    .then(items => res.json(items));
});

/**
 * @route POST api/testItem
 * @desc POST An Item To The DB
 * @access Public
 **/
router.post("/", (req, res) => {
  const newItem = new TestItem({
    name: req.body.name
  });

  newItem.save().then(item => res.json(item));
});

module.exports = router;
