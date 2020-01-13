const Users = require("../../User/User.model");

exports.calculateTaskSuggestion = async (email, tasks) => {
  let userProductivity = 0;

  // 1. Find the user
  await Users.find({ email })
    .then(res => (userProductivity = res[0].userProductivity))
    .catch(e => console.log("Cannot find the user. " + e));

  console.log(userProductivity);
  // 2. Calculate based on PRODUCTIVITY, DEALDINES, DIFFICULTY & PRIORITY
  // Idea:
  // Go through all of the tasks and individually check them by deadline, difficulty and priority
  // Mark it with one of three: SuggestedOne, SuggestedTwo or SuggestedThree.
  // Go through all of the tasks again and make `isSuggested` to true starting from SuggestedOne until reach userProductivity limit
};

/**
 * Available scenarios:
 * DEADLINE: Today
 * DIFFICULTY: Easy
 * PRIORITY: Low
 *
 * DEADLINE: Today
 * DIFFICULTY: Medium
 * PRIORITY: Low
 *
 * DEADLINE: Today
 * DIFFICULTY: Hard
 * PRIORITY: Low
 *
 * DEADLINE:  Today
 * DIFFICULTY: Easy
 * PRIORITY: Medium
 *
 * DEADLINE: Today
 * DIFFICULTY: Medium
 * PRIORITY: Medium
 * Points: 2
 *
 * DEADLINE: Today
 * DIFFICULTY: Hard
 * PRIORITY: Medium
 * Points: 2
 *
 * DEADLINE: Today
 * DIFFICULTY: Easy
 * PRIORITY: High
 * Points: 1
 *
 * DEADLINE: Today
 * DIFFICULTY: Medium
 * PRIORITY: High
 * Points: 3
 *
 * DEADLINE: Today
 * DIFFICULTY: Hard
 * PRIORITY: High
 * Points: 4
 *
 *
 */
