const Users = require("../../User/User.model");
const Task = require("../Task.model");

/**
 * This function calculates the task group and
 * total points for each task. The groups and
 * total points are used to suggest accurate
 * tasks to be completed based on user's inputed
 * mood.
 *
 * Task groups are crucial for the whole
 * task suggestion algorithm as they are used
 * to distinguish between the most important
 * and not so important tasks (the most important
 * ones will be always suggested first for the user).
 *
 * Possible task groups:
 * Group 1 - between 3 and 4 total points
 * Group 2 - between 2 and 3 total points
 * Group 3 - between 0 and 2 total points
 *
 * Total points are used in conjunction with
 * the mood algorithm as the mood algorithm
 * will provide a number that will be used
 * as a maximum when adding different tasks
 * to the suggested list based on their total point.
 * This is used for task suggestion algorithm
 * to make sure that the right amount of tasks
 * are offered to the user.
 *
 * The max total points can be 4 and the minimum - 1.25.
 */
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

/**
 * This function adds a certain amount of points
 * to the totalPoints field based on the
 * pointing system of this software.
 *
 * It calculates how many points will need
 * to be added based on task due date, priority
 * and difficulty.
 *
 * The possible points that this function can take are:
 * Deadline Points   - [1, 0.5, 0.25]
 * Priority Points   - [2, 1, 0.5]
 * Difficulty Points - [1, 0.75, 0.5]
 *
 * @param {*} deadlinePoints
 * @param {*} task - a specific task
 * @param {*} totalPoints
 * @param {*} priorityPoints
 * @param {*} difficultyPoints
 */
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

/**
 * This is a helper function that adds points based on priority
 * to the total points.
 *
 * @param {*} priority
 * @param {*} totalPoints
 */
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

/**
 * This is a helper function that adds points based on difficulty
 * to the total points.
 *
 * @param {*} difficulty
 * @param {*} totalPoints
 */
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

/**
 * This is a helper function that decides
 * which task group is assigned to each task
 * based on their total points calculated above.
 *
 * @param {Number} totalPoints
 */
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

/**
 * This function makes isSuggested field of each tasks
 * either true or false based on the task group that
 * is calculated above.
 *
 * It uses userProductivity (maximum number) that comes
 * from the mood algorithm which makes sure that the
 * correct amount of tasks are being made suggested
 * based on the mood that the user inputs.
 *
 * In this function, every unfinished task is being
 * assigned a task starting from Group 1 to Group 3
 * until the userProductivity (max nr) is reached.
 * This way, it makes sure that Group 1 tasks are being
 * suggested first and then Group 2-3 if there's enough
 * space.
 */
exports.makeTaskSuggested = async (email, tasks) => {
  /**
   * 1. FIND THE USER
   */
  await Users.find({ email })
    .then(res => (userProductivity = res[0].userProductivity))
    .catch(e => console.log("Cannot find the user. " + e));

  /**
   * 2. MAKE TASK IS SUGGESTED
   */
  let userProductivity = 0;
  let countUserProductivity = 0;

  tasks
    .filter(task => task.taskDueDate && !task.isTaskComplete)
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
      });
    });
};
