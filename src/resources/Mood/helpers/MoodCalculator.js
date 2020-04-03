import Users from "../../User/User.model";
import "regenerator-runtime/runtime";

/**
 * This function calculates the mood and productivity
 * based on a pointing system of this software
 * for a particular user and adds this information
 * to the database for that user.
 *
 * The possible moods that the userMood field
 * can have are [Positive, Neutral, Negative]
 *
 * The possible points that the userProductivity field
 * can have are between 13 and 5 inclusive.
 */
exports.calculateMoodAndProductivity = async (
  email,
  mood,
  motivation,
  isTired
) => {
  // 1. Find the user
  Users.find({ email })
    .then(() => console.log("Found user"))
    .catch(e => console.log("Cannot find the user. " + e));

  // 2. Calculate the productivity level
  let productivityLevel = 0;

  if (mood === "positive") {
    productivityLevel = productivityCalculator(10, motivation, isTired);
  }

  if (mood === "neutral") {
    productivityLevel = productivityCalculator(7, motivation, isTired);
  }

  if (mood === "negative") {
    productivityLevel = productivityCalculator(5, motivation, isTired);
  }

  // 3. Assign user mood & productivity level to the User
  const filter = { email: email };
  const update = { userMood: mood, userProductivity: productivityLevel };

  await Users.findOneAndUpdate(filter, update);
};

/**
 * Calculates the productivity level based on the below
 * parameters. Returns a total calculated userProductivity
 * field.
 *
 * The possible points that this function can take are:
 * Mood Points       - [10, 7, 5]
 * Motivation Points - [ 2, 1, 0]
 * isTired Points    - [ 1, 0]
 *
 * @param {*} points - mood points
 * @param {*} motivation - motivation taken form the server.
 * @param {*} isTired - boolean
 */
function productivityCalculator(points, motivation, isTired) {
  let productivityLevel = 0;

  productivityLevel += points;

  if (motivation === "High") {
    productivityLevel += 2;
  }

  if (motivation === "Medium") {
    productivityLevel += 1;
  }

  if (!isTired) {
    productivityLevel += 1;
  }

  return productivityLevel;
}
