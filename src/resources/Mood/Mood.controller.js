const Mood = require("./Mood.model");

/**
 * GET /api/mood/id
 *
 * @export
 * @param {any} req
 * @param {any} res
 **/
exports.moodDetail = (req, res, next) => {
  Mood.findOne({ _id: req.params.id }, err => {
    if (err) {
      res
        .status(500)
        .send(
          "Error occured trying to find a mood. Please check if the information is correct."
        );
    }
  })
    .then(task => res.json(task))
    .catch(next);
};

/**
 * POST /api/mood/add
 *
 * @export
 * @param {any} req
 * @param {any} res
 **/
exports.addMood_post = (req, res, next) => {
  const newMood = new Mood({
    moodName: req.body.moodName,
    moodMotivation: req.body.moodMotivation,
    isTired: req.body.isTired
  });

  newMood.save((err, mood) => {
    if (err) {
      return res
        .status(500)
        .send(
          "Error occured while trying to add a mood. Please check if the information is correct"
        );
    }

    return res.send("Mood has been added");
  });
};

/**
 * PUT /api/mood/calculate
 * TODO Calculate the final mood + add suggested tasks to the array
 * @export
 * @param {any} req
 * @param {any} res
 **/
exports.calculateTasks_put = (req, res, next) => {
  // TODO 1. Calculate final mood for current date
  /**
   * 1. Take all the moods of the user of the current date
   * 2.
   */
  // TODO 2. Find all relavant tasks
  // TODO 3. Add them to the suggested array
};
