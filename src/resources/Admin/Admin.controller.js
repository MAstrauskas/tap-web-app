import Task from "../Task/Task.model";
import User from "../User/User.model";

/**
 * POST /api/admin/clear-suggest
 *
 * @export
 * @param {any} req
 * @param {any} res
 **/
exports.clearSuggested_post = (req, res, next) => {
  Task.find({}, function(err, doc) {
    doc.forEach(task => {
      task.isTaskSuggested = false;

      task.save();
    });

    return res.json("Success clearing suggested tasks.");
  });
};

/**
 * GET /api/admin/clear-mood
 *
 * @exports
 * @param {any} req
 * @param {any} res
 */
exports.clearMood_get = (req, res, next) => {
  User.find({}, function(err, doc) {
    doc.forEach(user => {
      user.userMood = undefined;
      user.userProductivity = undefined;

      user.save();
    });

    return res.json("Success clearing user mood.");
  });
};
