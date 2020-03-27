import "@testing-library/jest-dom/extend-expect";
import sortByPriority from "../sortByPriority";
import sortyByPriority from "../sortByPriority";

describe("setByPriority", () => {
  beforeAll(() => {
    Date.now = jest.fn(() => new Date(Date.UTC(2020, 0, 1)).valueOf());
  });

  it("should sort tasks correctly by priority", () => {
    const tasks = [
      {
        _id: "__ID__",
        email: "test@gmail.com",
        taskName: "__TASK_ONE__",
        taskDescription: "__TASK_DESCRIPTION__",
        taskCreateDate: "2020-01-01T12:00:00.000Z",
        taskDueDate: "2020-01-10T12:00:00.000Z",
        taskPriority: "Medium",
        taskDifficulty: "Medium",
        isTaskComplete: false,
        isTaskSuggested: false,
        taskGroup: 3,
        taskTotalPoints: 0
      },
      {
        _id: "__ID_TWO_",
        email: "test@gmail.com",
        taskName: "__TASK_TWO__",
        taskDescription: "__TASK_DESCRIPTION__",
        taskCreateDate: "2020-01-01T12:00:00.000Z",
        taskDueDate: "2020-01-10T12:00:00.000Z",
        taskPriority: "Low",
        taskDifficulty: "Medium",
        isTaskComplete: false,
        isTaskSuggested: false,
        taskGroup: 3,
        taskTotalPoints: 0
      },
      {
        _id: "__ID_THREE_",
        email: "test@gmail.com",
        taskName: "__TASK_THREE__",
        taskDescription: "__TASK_DESCRIPTION__",
        taskCreateDate: "2020-01-01T12:00:00.000Z",
        taskDueDate: "2020-01-10T12:00:00.000Z",
        taskPriority: "High",
        taskDifficulty: "Medium",
        isTaskComplete: false,
        isTaskSuggested: false,
        taskGroup: 3,
        taskTotalPoints: 0
      }
    ];

    const expectedResult = [
      {
        _id: "__ID_THREE_",
        email: "test@gmail.com",
        taskName: "__TASK_THREE__",
        taskDescription: "__TASK_DESCRIPTION__",
        taskCreateDate: "2020-01-01T12:00:00.000Z",
        taskDueDate: "2020-01-10T12:00:00.000Z",
        taskPriority: "High",
        taskDifficulty: "Medium",
        isTaskComplete: false,
        isTaskSuggested: false,
        taskGroup: 3,
        taskTotalPoints: 0
      },
      {
        _id: "__ID__",
        email: "test@gmail.com",
        taskName: "__TASK_ONE__",
        taskDescription: "__TASK_DESCRIPTION__",
        taskCreateDate: "2020-01-01T12:00:00.000Z",
        taskDueDate: "2020-01-10T12:00:00.000Z",
        taskPriority: "Medium",
        taskDifficulty: "Medium",
        isTaskComplete: false,
        isTaskSuggested: false,
        taskGroup: 3,
        taskTotalPoints: 0
      },
      {
        _id: "__ID_TWO_",
        email: "test@gmail.com",
        taskName: "__TASK_TWO__",
        taskDescription: "__TASK_DESCRIPTION__",
        taskCreateDate: "2020-01-01T12:00:00.000Z",
        taskDueDate: "2020-01-10T12:00:00.000Z",
        taskPriority: "Low",
        taskDifficulty: "Medium",
        isTaskComplete: false,
        isTaskSuggested: false,
        taskGroup: 3,
        taskTotalPoints: 0
      }
    ];

    expect(sortByPriority(tasks)).toStrictEqual(expectedResult);
  });

  it("should sort multiple tasks correctly by priority", () => {
    const tasks = [
      {
        _id: "__ID__",
        email: "test@gmail.com",
        taskName: "__TASK_ONE__",
        taskDescription: "__TASK_DESCRIPTION__",
        taskCreateDate: "2020-01-01T12:00:00.000Z",
        taskDueDate: "2020-01-10T12:00:00.000Z",
        taskPriority: "Medium",
        taskDifficulty: "Medium",
        isTaskComplete: false,
        isTaskSuggested: false,
        taskGroup: 3,
        taskTotalPoints: 0
      },
      {
        _id: "__ID_TWO__",
        email: "test@gmail.com",
        taskName: "__TASK_TWO__",
        taskDescription: "__TASK_DESCRIPTION__",
        taskCreateDate: "2020-01-01T12:00:00.000Z",
        taskDueDate: "2020-01-10T12:00:00.000Z",
        taskPriority: "High",
        taskDifficulty: "Medium",
        isTaskComplete: false,
        isTaskSuggested: false,
        taskGroup: 3,
        taskTotalPoints: 0
      },
      {
        _id: "__ID_THREE__",
        email: "test@gmail.com",
        taskName: "__TASK_THREE__",
        taskDescription: "__TASK_DESCRIPTION__",
        taskCreateDate: "2020-01-01T12:00:00.000Z",
        taskDueDate: "2020-01-10T12:00:00.000Z",
        taskPriority: "High",
        taskDifficulty: "Medium",
        isTaskComplete: false,
        isTaskSuggested: false,
        taskGroup: 3,
        taskTotalPoints: 0
      },
      {
        _id: "__ID_FOUR__",
        email: "test@gmail.com",
        taskName: "__TASK_FOUR__",
        taskDescription: "__TASK_DESCRIPTION__",
        taskCreateDate: "2020-01-01T12:00:00.000Z",
        taskDueDate: "2020-01-10T12:00:00.000Z",
        taskPriority: "Low",
        taskDifficulty: "Medium",
        isTaskComplete: false,
        isTaskSuggested: false,
        taskGroup: 3,
        taskTotalPoints: 0
      },
      {
        _id: "__ID_FIVE__",
        email: "test@gmail.com",
        taskName: "__TASK_FIVE__",
        taskDescription: "__TASK_DESCRIPTION__",
        taskCreateDate: "2020-01-01T12:00:00.000Z",
        taskDueDate: "2020-01-10T12:00:00.000Z",
        taskPriority: "Medium",
        taskDifficulty: "Medium",
        isTaskComplete: false,
        isTaskSuggested: false,
        taskGroup: 3,
        taskTotalPoints: 0
      },
      {
        _id: "__ID_SIX__",
        email: "test@gmail.com",
        taskName: "__TASK_SIX__",
        taskDescription: "__TASK_DESCRIPTION__",
        taskCreateDate: "2020-01-01T12:00:00.000Z",
        taskDueDate: "2020-01-10T12:00:00.000Z",
        taskPriority: "Low",
        taskDifficulty: "Medium",
        isTaskComplete: false,
        isTaskSuggested: false,
        taskGroup: 3,
        taskTotalPoints: 0
      },
      {
        _id: "__ID_SEVEN__",
        email: "test@gmail.com",
        taskName: "__TASK_SIX__",
        taskDescription: "__TASK_DESCRIPTION__",
        taskCreateDate: "2020-01-01T12:00:00.000Z",
        taskDueDate: "2020-01-10T12:00:00.000Z",
        taskPriority: "Medium",
        taskDifficulty: "Medium",
        isTaskComplete: false,
        isTaskSuggested: false,
        taskGroup: 3,
        taskTotalPoints: 0
      },
      {
        _id: "__ID_EIGHT__",
        email: "test@gmail.com",
        taskName: "__TASK_EIGHT__",
        taskDescription: "__TASK_DESCRIPTION__",
        taskCreateDate: "2020-01-01T12:00:00.000Z",
        taskDueDate: "2020-01-10T12:00:00.000Z",
        taskPriority: "High",
        taskDifficulty: "Medium",
        isTaskComplete: false,
        isTaskSuggested: false,
        taskGroup: 3,
        taskTotalPoints: 0
      }
    ];

    const expectedResult = [
      {
        _id: "__ID_TWO__",
        email: "test@gmail.com",
        taskName: "__TASK_TWO__",
        taskDescription: "__TASK_DESCRIPTION__",
        taskCreateDate: "2020-01-01T12:00:00.000Z",
        taskDueDate: "2020-01-10T12:00:00.000Z",
        taskPriority: "High",
        taskDifficulty: "Medium",
        isTaskComplete: false,
        isTaskSuggested: false,
        taskGroup: 3,
        taskTotalPoints: 0
      },
      {
        _id: "__ID_THREE__",
        email: "test@gmail.com",
        taskName: "__TASK_THREE__",
        taskDescription: "__TASK_DESCRIPTION__",
        taskCreateDate: "2020-01-01T12:00:00.000Z",
        taskDueDate: "2020-01-10T12:00:00.000Z",
        taskPriority: "High",
        taskDifficulty: "Medium",
        isTaskComplete: false,
        isTaskSuggested: false,
        taskGroup: 3,
        taskTotalPoints: 0
      },
      {
        _id: "__ID_EIGHT__",
        email: "test@gmail.com",
        taskName: "__TASK_EIGHT__",
        taskDescription: "__TASK_DESCRIPTION__",
        taskCreateDate: "2020-01-01T12:00:00.000Z",
        taskDueDate: "2020-01-10T12:00:00.000Z",
        taskPriority: "High",
        taskDifficulty: "Medium",
        isTaskComplete: false,
        isTaskSuggested: false,
        taskGroup: 3,
        taskTotalPoints: 0
      },
      {
        _id: "__ID__",
        email: "test@gmail.com",
        taskName: "__TASK_ONE__",
        taskDescription: "__TASK_DESCRIPTION__",
        taskCreateDate: "2020-01-01T12:00:00.000Z",
        taskDueDate: "2020-01-10T12:00:00.000Z",
        taskPriority: "Medium",
        taskDifficulty: "Medium",
        isTaskComplete: false,
        isTaskSuggested: false,
        taskGroup: 3,
        taskTotalPoints: 0
      },
      {
        _id: "__ID_FIVE__",
        email: "test@gmail.com",
        taskName: "__TASK_FIVE__",
        taskDescription: "__TASK_DESCRIPTION__",
        taskCreateDate: "2020-01-01T12:00:00.000Z",
        taskDueDate: "2020-01-10T12:00:00.000Z",
        taskPriority: "Medium",
        taskDifficulty: "Medium",
        isTaskComplete: false,
        isTaskSuggested: false,
        taskGroup: 3,
        taskTotalPoints: 0
      },
      {
        _id: "__ID_SEVEN__",
        email: "test@gmail.com",
        taskName: "__TASK_SIX__",
        taskDescription: "__TASK_DESCRIPTION__",
        taskCreateDate: "2020-01-01T12:00:00.000Z",
        taskDueDate: "2020-01-10T12:00:00.000Z",
        taskPriority: "Medium",
        taskDifficulty: "Medium",
        isTaskComplete: false,
        isTaskSuggested: false,
        taskGroup: 3,
        taskTotalPoints: 0
      },
      {
        _id: "__ID_FOUR__",
        email: "test@gmail.com",
        taskName: "__TASK_FOUR__",
        taskDescription: "__TASK_DESCRIPTION__",
        taskCreateDate: "2020-01-01T12:00:00.000Z",
        taskDueDate: "2020-01-10T12:00:00.000Z",
        taskPriority: "Low",
        taskDifficulty: "Medium",
        isTaskComplete: false,
        isTaskSuggested: false,
        taskGroup: 3,
        taskTotalPoints: 0
      },
      {
        _id: "__ID_SIX__",
        email: "test@gmail.com",
        taskName: "__TASK_SIX__",
        taskDescription: "__TASK_DESCRIPTION__",
        taskCreateDate: "2020-01-01T12:00:00.000Z",
        taskDueDate: "2020-01-10T12:00:00.000Z",
        taskPriority: "Low",
        taskDifficulty: "Medium",
        isTaskComplete: false,
        isTaskSuggested: false,
        taskGroup: 3,
        taskTotalPoints: 0
      }
    ];

    expect(sortByPriority(tasks)).toStrictEqual(expectedResult);
  });

  it("should correctly sort medium and high priority tasks", () => {
    const tasks = [
      {
        _id: "__ID__",
        email: "test@gmail.com",
        taskName: "__TASK__",
        taskDescription: "__TASK_DESCRIPTION__",
        taskCreateDate: "2020-01-01T12:00:00.000Z",
        taskDueDate: "2020-01-10T12:00:00.000Z",
        taskPriority: "Medium",
        taskDifficulty: "Medium",
        isTaskComplete: false,
        isTaskSuggested: false,
        taskGroup: 3,
        taskTotalPoints: 0
      },
      {
        _id: "__ID_TWO__",
        email: "test@gmail.com",
        taskName: "__TASK_TWO__",
        taskDescription: "__TASK_DESCRIPTION__",
        taskCreateDate: "2020-01-01T12:00:00.000Z",
        taskDueDate: "2020-01-10T12:00:00.000Z",
        taskPriority: "High",
        taskDifficulty: "Medium",
        isTaskComplete: false,
        isTaskSuggested: false,
        taskGroup: 3,
        taskTotalPoints: 0
      },
      {
        _id: "__ID_THREE__",
        email: "test@gmail.com",
        taskName: "__TASK_THREE__",
        taskDescription: "__TASK_DESCRIPTION__",
        taskCreateDate: "2020-01-01T12:00:00.000Z",
        taskDueDate: "2020-01-10T12:00:00.000Z",
        taskPriority: "Medium",
        taskDifficulty: "Medium",
        isTaskComplete: false,
        isTaskSuggested: false,
        taskGroup: 3,
        taskTotalPoints: 0
      },
      {
        _id: "__ID_FOUR__",
        email: "test@gmail.com",
        taskName: "__TASK_FOUR__",
        taskDescription: "__TASK_DESCRIPTION__",
        taskCreateDate: "2020-01-01T12:00:00.000Z",
        taskDueDate: "2020-01-10T12:00:00.000Z",
        taskPriority: "High",
        taskDifficulty: "Medium",
        isTaskComplete: false,
        isTaskSuggested: false,
        taskGroup: 3,
        taskTotalPoints: 0
      }
    ];

    const extasks = [
      {
        _id: "__ID_TWO__",
        email: "test@gmail.com",
        taskName: "__TASK_TWO__",
        taskDescription: "__TASK_DESCRIPTION__",
        taskCreateDate: "2020-01-01T12:00:00.000Z",
        taskDueDate: "2020-01-10T12:00:00.000Z",
        taskPriority: "High",
        taskDifficulty: "Medium",
        isTaskComplete: false,
        isTaskSuggested: false,
        taskGroup: 3,
        taskTotalPoints: 0
      },
      {
        _id: "__ID_FOUR__",
        email: "test@gmail.com",
        taskName: "__TASK_FOUR__",
        taskDescription: "__TASK_DESCRIPTION__",
        taskCreateDate: "2020-01-01T12:00:00.000Z",
        taskDueDate: "2020-01-10T12:00:00.000Z",
        taskPriority: "High",
        taskDifficulty: "Medium",
        isTaskComplete: false,
        isTaskSuggested: false,
        taskGroup: 3,
        taskTotalPoints: 0
      },
      {
        _id: "__ID__",
        email: "test@gmail.com",
        taskName: "__TASK__",
        taskDescription: "__TASK_DESCRIPTION__",
        taskCreateDate: "2020-01-01T12:00:00.000Z",
        taskDueDate: "2020-01-10T12:00:00.000Z",
        taskPriority: "Medium",
        taskDifficulty: "Medium",
        isTaskComplete: false,
        isTaskSuggested: false,
        taskGroup: 3,
        taskTotalPoints: 0
      },
      {
        _id: "__ID_THREE__",
        email: "test@gmail.com",
        taskName: "__TASK_THREE__",
        taskDescription: "__TASK_DESCRIPTION__",
        taskCreateDate: "2020-01-01T12:00:00.000Z",
        taskDueDate: "2020-01-10T12:00:00.000Z",
        taskPriority: "Medium",
        taskDifficulty: "Medium",
        isTaskComplete: false,
        isTaskSuggested: false,
        taskGroup: 3,
        taskTotalPoints: 0
      }
    ];

    expect(sortyByPriority(tasks)).toStrictEqual(extasks);
  });

  it("should skip sorting if task priority is not high, medium or low", () => {
    const tasks = [
      {
        _id: "__ID__",
        email: "test@gmail.com",
        taskName: "__TASK__",
        taskDescription: "__TASK_DESCRIPTION__",
        taskCreateDate: "2020-01-01T12:00:00.000Z",
        taskDueDate: "2020-01-10T12:00:00.000Z",
        taskPriority: "",
        taskDifficulty: "Medium",
        isTaskComplete: false,
        isTaskSuggested: false,
        taskGroup: 3,
        taskTotalPoints: 0
      },
      {
        _id: "__ID_TWO__",
        email: "test@gmail.com",
        taskName: "__TASK_TWO__",
        taskDescription: "__TASK_DESCRIPTION__",
        taskCreateDate: "2020-01-01T12:00:00.000Z",
        taskDueDate: "2020-01-10T12:00:00.000Z",
        taskPriority: "",
        taskDifficulty: "Medium",
        isTaskComplete: false,
        isTaskSuggested: false,
        taskGroup: 3,
        taskTotalPoints: 0
      },
      ,
    ];

    expect(sortyByPriority(tasks)).toStrictEqual(tasks);
  });
});
