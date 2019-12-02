const MoodList = require("./MoodList.model");

/**
 * GET /api/moodlist/
 *
 * @export
 * @param {any} req
 * @param {any} res
 **/
exports.allMoods = (req, res, next) => {
  MoodList.find({}, err => {
    if (err) {
      res
        .status(500)
        .send(
          "Error occured trying to find a list of moods. Please try again."
        );
    }
  })
    .sort("moodName")
    .then(moodList => res.json(moodList))
    .catch(next);
};

/**
 * POST /api/moodlist/add
 *
 * @export
 * @param {any} req
 * @param {any} res
 **/
exports.addToMoodList = (req, res, next) => {
  MoodList.create(req.body.moodList, err => {
    if (err) {
      return res
        .status(500)
        .send(
          "Error occured trying to add a list of moods. Please check your information and try again."
        );
    }

    return res.json({ return: "Success" });
  });
};
