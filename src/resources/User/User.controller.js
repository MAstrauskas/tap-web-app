const User = require("./User.model");

/**
 * GET /api/user
 *
 * @export
 * @param {any} req
 * @param {any} res
 **/
exports.userList = (req, res, next) => {
  User.find()
    .then(users => res.json(users))
    .catch(() => next());
};

/**
 * POST /api/user/add
 *
 * @export
 * @param {any} req
 * @param {any} res
 **/
exports.addUser_post = (req, res, next) => {
  const fullName = req.body.fullName.split(" ");

  const newUser = new User({
    userId: 1,
    firstName: fullName[0],
    lastName: fullName[1],
    emailAddress: req.body.emailAddress,
    password: req.body.password, // TODO: HASH password later,
    userMood: req.body.userMood
  });

  newUser
    .save()
    .then(user => res.json(user))
    .catch(() => next());
};
