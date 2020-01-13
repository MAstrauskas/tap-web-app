const Users = require("../../User/User.model");

exports.calculateTaskSuggestion = async (email, tasks) => {
  let userProductivity = 0;

  // 1. Find the user
  await Users.find({ email })
    .then(res => (userProductivity = res[0].userProductivity))
    .catch(e => console.log("Cannot find the user. " + e));

  // 2. Calculate based on PRODUCTIVITY, DEALDINES, DIFFICULTY & PRIORITY
  console.log(tasks);
};
