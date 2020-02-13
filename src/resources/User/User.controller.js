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
