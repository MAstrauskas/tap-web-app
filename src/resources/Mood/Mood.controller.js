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
    .then(mood => {
      console.log(mood);
      return res.json(mood);
    })
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
  Mood.create(req.body, function(err, mood) {
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

    return res.json(mood);
  });
};
