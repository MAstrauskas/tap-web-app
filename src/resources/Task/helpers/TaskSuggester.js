const Users = require("../../User/User.model");

exports.calculateTaskSuggestion = async (email, tasks) => {
  let userProductivity = 0;

  /**
   * 1. FIND THE USER
   */
  await Users.find({ email })
    .then(res => (userProductivity = res[0].userProductivity))
    .catch(e => console.log("Cannot find the user. " + e));

  console.log(userProductivity);
  // Idea:
  // Go through all of the tasks and individually check them by deadline, difficulty and priority
  // Add total points to it based on the scenarios doc.
  // Mark it with one of three: Group 1, Group 2 or Group 3.
  // Go through all of the tasks again and make `isSuggested` to true starting from Group 1 until reach userProductivity limit
  console.log(tasks);
  tasks.map(task => {
    /**
     * 2. CALCULATION OF TOTAL POINTS BASED ON DEADLINE, PRIORITY & DIFFICULTY OF THE TASK
     */
    let totalPoints = 0;
    let priorityPoints = 0;
    let difficultyPoints = 0;

    // Check due date
    const dueDate = new Date(task.taskDueDate);
    const todaysDate = new Date();
    const tomorrowsDate = new Date();
    const nextWeekDate = new Date();

    tomorrowsDate.setDate(new Date().getDate() + 1);
    nextWeekDate.setDate(new Date().getDate() + 7);

    const dueDateMidnight = dueDate.setHours(0, 0, 0, 0);
    const todayMidnight = todaysDate.setHours(0, 0, 0, 0);
    const tomorrowMidnight = tomorrowsDate.setHours(0, 0, 0, 0);
    const nextWeekMidnight = nextWeekDate.setHours(0, 0, 0, 0);

    // Today
    if (dueDateMidnight === todayMidnight) {
      totalPoints = calculateForDeadline(
        1,
        task,
        totalPoints,
        priorityPoints,
        difficultyPoints
      );
    }

    // Tomorrow
    if (dueDateMidnight === tomorrowMidnight) {
      totalPoints = calculateForDeadline(
        0.5,
        task,
        totalPoints,
        priorityPoints,
        difficultyPoints
      );
    }

    // Up to next week
    if (
      dueDateMidnight > tomorrowMidnight &&
      dueDateMidnight < nextWeekMidnight
    ) {
      totalPoints = calculateForDeadline(
        0.25,
        task,
        totalPoints,
        priorityPoints,
        difficultyPoints
      );
    }

    console.log("Total PTS: " + totalPoints);
  });
};

function calculateForDeadline(
  deadlinePoints,
  task,
  totalPoints,
  priorityPoints,
  difficultyPoints
) {
  totalPoints += deadlinePoints;

  priorityPoints += calculatePriority(task.taskPriority, priorityPoints);
  difficultyPoints += calculateDifficulty(
    task.taskDifficulty,
    difficultyPoints
  );

  totalPoints += priorityPoints + difficultyPoints;

  return totalPoints;
}

function calculatePriority(priority, totalPoints) {
  if (priority === "Low") {
    totalPoints += 0.5;
  } else if (priority === "Medium") {
    totalPoints += 1;
  } else if (priority === "High") {
    totalPoints += 2;
  }

  return totalPoints;
}

function calculateDifficulty(difficulty, totalPoints) {
  if (difficulty === "Easy") {
    totalPoints += 0.5;
  } else if (difficulty === "Medium") {
    totalPoints += 0.75;
  } else if (difficulty === "Hard") {
    totalPoints += 1;
  }

  return totalPoints;
}
