const Users = require("../../User/User.model");
const Task = require("../Task.model");
exports.calculateTaskSuggestion = async (email, tasks) => {
  let userProductivity = 0;

  /**
   * 1. FIND THE USER
   */
  await Users.find({ email })
    .then(res => (userProductivity = res[0].userProductivity))
    .catch(e => console.log("Cannot find the user. " + e));

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

    /**
     * 3. ASSIGN A GROUP BASED ON TOTAL POINTS
     */

    const taskGroup = calculateTaskGroup(totalPoints);

    /**
     * 4. ADD TASK GROUP & TOTAL POINTS TO THE TASK
     */

    const data = {
      taskGroup: taskGroup,
      taskTotalPoints: totalPoints
    };

    Task.findByIdAndUpdate(task._id, data, (err, task) => {
      if (err) {
        console.log(
          "Error occured while trying to add Group & Points to a task. Please check if the information is correct"
        );
      }

      console.log("Task has been updated.");
    });
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

function calculateTaskGroup(totalPoints) {
  let taskGroup = 0;

  if (totalPoints >= 0 && totalPoints < 2) {
    taskGroup = 3;
  } else if (totalPoints >= 2 && totalPoints < 3) {
    taskGroup = 2;
  } else if (totalPoints >= 3 && totalPoints <= 4) {
    taskGroup = 1;
  }

  return taskGroup;
}

exports.makeTaskSuggested = async (email, tasks) => {
  let userProductivity = 0;
  let countUserProductivity = 0;
  /**
   * 1. FIND THE USER
   */
  await Users.find({ email })
    .then(res => (userProductivity = res[0].userProductivity))
    .catch(e => console.log("Cannot find the user. " + e));

  /**
   * 2. MAKE TASK IS SUGGESTED
   */

  tasks
    .filter(task => task.taskDueDate)
    .map(task => {
      const taskGroup = task.taskGroup;
      const taskPoints = task.taskTotalPoints;

      let isTaskSuggested = false;

      if (countUserProductivity <= userProductivity) {
        if (
          taskGroup === 1 &&
          countUserProductivity + taskPoints <= userProductivity &&
          taskPoints !== 0
        ) {
          isTaskSuggested = true;
          countUserProductivity += taskPoints;
        } else if (
          taskGroup === 2 &&
          countUserProductivity + taskPoints <= userProductivity &&
          taskPoints !== 0
        ) {
          isTaskSuggested = true;
          countUserProductivity += taskPoints;
        } else if (
          taskGroup === 3 &&
          countUserProductivity + taskPoints <= userProductivity &&
          taskPoints !== 0
        ) {
          isTaskSuggested = true;
          countUserProductivity += taskPoints;
        }
      }

      /**
       * ADD IS SUGGESTED TO THE TASK
       */

      const data = {
        isTaskSuggested: isTaskSuggested
      };

      Task.findByIdAndUpdate(task._id, data, (err, task) => {
        if (err) {
          console.log(
            "Error occured while trying to update 'isTaskSuggested'. Please check if the information is correct"
          );
        }

        console.log("Task 'isSuggested' has been updated.");
      });
    });
};
