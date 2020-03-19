const User = require("./User.model");

/**
 * GET /api/user
 *
 * @export
 * @param {any} req
 * @param {any} res
 **/

/* istanbul ignore next */
exports.userList = (req, res, next) => {
  User.find({}, function(err, users) {
    if (err) {
      console.log("Error finding users");

      return next();
    }

    res.json(users);
  });
};

/**
 * GET /api/user/single
 *
 * @export
 * @param {any} req
 * @param {any} res
 **/

/* istanbul ignore next */
exports.userGet = (req, res, next) => {
  console.log(req.params.email);
  console.log("Hi");
  User.find({ email: req.params.email }, function(err, user) {
    if (err) {
      console.log("Error finding a specific user");

      return next();
    }

    console.log(user);
    res.json(user);
  });
};

/**
 * POST /api/user/add
 *
 * @export
 * @param {any} req
 * @param {any} res
 **/

/* istanbul ignore next */
exports.addUser_post = (req, res, next) => {
  const fullName = req.body.name.split(" ");

  User.findOne({ email: req.body.email }, function(err, doc) {
    if (doc && doc.email === req.body.email) {
    } else {
      const newUser = new User({
        userId: 1,
        firstName: fullName[0],
        lastName: fullName[1],
        email: req.body.email
      });

      newUser
        .save()
        .then(user => res.json(user))
        .catch(() => next());
    }
  });
};

/**
 * POST /api/user/clearMood
 *
 * @exports
 * @param {any} req
 * @param {any} res
 */
exports.clearMood_post = (req, res, next) => {
  User.find({}, function(err, doc) {
    doc.forEach(user => {
      user.userMood = undefined;
      user.userProductivity = undefined;

      user.save();
    });

    console.log("Removed successfully");
    return res.json("Success clearing user mood.");
  });
};
