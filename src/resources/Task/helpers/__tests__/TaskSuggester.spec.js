import { calculateForDeadline, calculateTaskGroup } from "../TaskSuggester";

describe("TaskSuggester", () => {
  it("totalPoints should be 3 when priority is high and difficulty is hard", async () => {
    const data = {
      deadlinePoints: 0,
      task: {
        taskPriority: "High",
        taskDifficulty: "Hard"
      },
      totalPoints: 0,
      priorityPoints: 0,
      difficultyPoints: 0
    };

    const calculatedTotalPoints = calculateForDeadline(
      data.deadlinePoints,
      data.task,
      data.totalPoints,
      data.priorityPoints,
      data.difficultyPoints
    );

    expect(calculatedTotalPoints).toBe(3);
  });

  it("totalPoints should be 2.75 when priority is high and difficulty is medium", async () => {
    const data = {
      deadlinePoints: 0,
      task: {
        taskPriority: "High",
        taskDifficulty: "Medium"
      },
      totalPoints: 0,
      priorityPoints: 0,
      difficultyPoints: 0
    };

    const calculatedTotalPoints = calculateForDeadline(
      data.deadlinePoints,
      data.task,
      data.totalPoints,
      data.priorityPoints,
      data.difficultyPoints
    );

    expect(calculatedTotalPoints).toBe(2.75);
  });

  it("totalPoints should be 2.5 when priority is high and difficulty is easy", async () => {
    const data = {
      deadlinePoints: 0,
      task: {
        taskPriority: "High",
        taskDifficulty: "Easy"
      },
      totalPoints: 0,
      priorityPoints: 0,
      difficultyPoints: 0
    };

    const calculatedTotalPoints = calculateForDeadline(
      data.deadlinePoints,
      data.task,
      data.totalPoints,
      data.priorityPoints,
      data.difficultyPoints
    );

    expect(calculatedTotalPoints).toBe(2.5);
  });

  it("totalPoints should be 2 when priority is medium and difficulty is hard", async () => {
    const data = {
      deadlinePoints: 0,
      task: {
        taskPriority: "Medium",
        taskDifficulty: "Hard"
      },
      totalPoints: 0,
      priorityPoints: 0,
      difficultyPoints: 0
    };

    const calculatedTotalPoints = calculateForDeadline(
      data.deadlinePoints,
      data.task,
      data.totalPoints,
      data.priorityPoints,
      data.difficultyPoints
    );

    expect(calculatedTotalPoints).toBe(2);
  });

  it("totalPoints should be 1.75 when priority is medium and difficulty is medium", async () => {
    const data = {
      deadlinePoints: 0,
      task: {
        taskPriority: "Medium",
        taskDifficulty: "Medium"
      },
      totalPoints: 0,
      priorityPoints: 0,
      difficultyPoints: 0
    };

    const calculatedTotalPoints = calculateForDeadline(
      data.deadlinePoints,
      data.task,
      data.totalPoints,
      data.priorityPoints,
      data.difficultyPoints
    );

    expect(calculatedTotalPoints).toBe(1.75);
  });

  it("totalPoints should be 1.5 when priority is medium and difficulty is easy", async () => {
    const data = {
      deadlinePoints: 0,
      task: {
        taskPriority: "Medium",
        taskDifficulty: "Easy"
      },
      totalPoints: 0,
      priorityPoints: 0,
      difficultyPoints: 0
    };

    const calculatedTotalPoints = calculateForDeadline(
      data.deadlinePoints,
      data.task,
      data.totalPoints,
      data.priorityPoints,
      data.difficultyPoints
    );

    expect(calculatedTotalPoints).toBe(1.5);
  });

  it("totalPoints should be 1.5 when priority is low and difficulty is hard", async () => {
    const data = {
      deadlinePoints: 0,
      task: {
        taskPriority: "Low",
        taskDifficulty: "Hard"
      },
      totalPoints: 0,
      priorityPoints: 0,
      difficultyPoints: 0
    };

    const calculatedTotalPoints = calculateForDeadline(
      data.deadlinePoints,
      data.task,
      data.totalPoints,
      data.priorityPoints,
      data.difficultyPoints
    );

    expect(calculatedTotalPoints).toBe(1.5);
  });

  it("totalPoints should be 1.25 when priority is low and difficulty is medium", async () => {
    const data = {
      deadlinePoints: 0,
      task: {
        taskPriority: "Low",
        taskDifficulty: "Medium"
      },
      totalPoints: 0,
      priorityPoints: 0,
      difficultyPoints: 0
    };

    const calculatedTotalPoints = calculateForDeadline(
      data.deadlinePoints,
      data.task,
      data.totalPoints,
      data.priorityPoints,
      data.difficultyPoints
    );

    expect(calculatedTotalPoints).toBe(1.25);
  });

  it("totalPoints should be 1 when priority is low and difficulty is easy", async () => {
    const data = {
      deadlinePoints: 0,
      task: {
        taskPriority: "Low",
        taskDifficulty: "Easy"
      },
      totalPoints: 0,
      priorityPoints: 0,
      difficultyPoints: 0
    };

    const calculatedTotalPoints = calculateForDeadline(
      data.deadlinePoints,
      data.task,
      data.totalPoints,
      data.priorityPoints,
      data.difficultyPoints
    );

    expect(calculatedTotalPoints).toBe(1);
  });

  it("taskGroup should be 1 when totalPoints are between 3 and 4", async () => {
    const totalPoints = 3.5;

    const calculatedTaskGroup = calculateTaskGroup(totalPoints);

    expect(calculatedTaskGroup).toBe(1);
  });

  it("taskGroup should be 2 when totalPoints are between 2 and 3", async () => {
    const totalPoints = 2.5;

    const calculatedTaskGroup = calculateTaskGroup(totalPoints);

    expect(calculatedTaskGroup).toBe(2);
  });

  it("taskGroup should be 3 when totalPoints are between 0 and 2", async () => {
    const totalPoints = 1.5;

    const calculatedTaskGroup = calculateTaskGroup(totalPoints);

    expect(calculatedTaskGroup).toBe(3);
  });
});
