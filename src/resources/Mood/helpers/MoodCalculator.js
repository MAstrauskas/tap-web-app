const Users = require("../../User/User.model");
const Mood = require("../Mood.model");
const Tasks = require("../../Task/Task.model");

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
    productivityLevel = productivityCalculator(7, motivation, isTired);
  }

  if (mood === "neutral") {
    productivityLevel = productivityCalculator(5, motivation, isTired);
  }

  if (mood === "negative") {
    productivityLevel = productivityCalculator(3, motivation, isTired);
  }

  // 3. Assign user mood & productivity level to the User
  const filter = { email: email };
  const update = { userMood: mood, userProductivity: productivityLevel };

  await Users.findOneAndUpdate(filter, update);
};

function productivityCalculator(points, motivation, isTired) {
  let productivityLevel = 0;

  productivityLevel += points;

  if (motivation === "High") {
    productivityLevel += 2;
  }

  if (motivation === "Medium") {
    productivityLevel += 1;
  }

  if (motivation === "Low") {
    productivityLevel += 0;
  }

  if (isTired === false) {
    productivityLevel += 1;
  }

  if (isTired === true) {
    productivityLevel += 0;
  }

  return productivityLevel;
}
