const Mood = require("./Mood.model");
const MoodCalculator = require("./helpers/MoodCalculator");

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
    email: req.body.email,
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

    MoodCalculator.calculateMoodAndProductivity(
      req.body.email,
      req.body.moodName,
      req.body.moodMotivation,
      req.body.isTired
    );

    return res.send("Mood has been added");
  });
};
