import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { useAuth0 } from "../../../../react-auth0-spa";
import { BrowserRouter as Router } from "react-router-dom";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import mediaQuery from "css-mediaquery";
import Summary, {
  getCompletedTasksForToday,
  getCompletedTasksForThisWeek
} from "../Summary";

jest.mock("../../../../react-auth0-spa");

describe("Summary", () => {
  const mock = new MockAdapter(axios);

  const user = {
    email: "test@test.com",
    fullName: "__FULL_NAME__",
    email_verified: true,
    sub: "__SUB__"
  };

  const registeredUser = {
    name: user.fullName,
    email: user.email
  };

  const token = "__TOKEN__";
  const data = {
    tasks: []
  };
  function createMatchMedia(width) {
    return query => ({
      matches: mediaQuery.match(query, { width }),
      addListener: () => {},
      removeListener: () => {}
    });
  }

  beforeAll(() => {
    window.matchMedia = createMatchMedia(window.innerWidth);
  });

  beforeEach(() => {
    // Mock Auth0 and return logged out sta te
    useAuth0.mockReturnValue({
      isAuthenticated: true,
      user,
      logout: jest.fn(),
      loginWithRedirect: jest.fn()
    });

    mock.onPost("/api/user/add").reply(200, registeredUser);
    mock.onGet(`/api/tasks/${user.email}`).reply(200, data);
  });

  it("should render Summary page", () => {
    const { getByTestId } = render(
      <Router>
        <Summary userEmail={user.email} token={token} />
      </Router>
    );

    getByTestId("summary-cards");
    getByTestId("task-history");
  });

  it("should render mobile view", () => {
    global.matchMedia = media => ({
      addListener: jest.fn(),
      removeListener: jest.fn(),
      matches: media === "(max-width: 800px)"
    });

    global.matchMedia(500);

    const { getByTestId } = render(
      <Router>
        <Summary userEmail={user.email} token={token} />
      </Router>
    );

    getByTestId("mobile-buttons");
  });

  it("should return 2 completed tasks for today when they are made complete", () => {
    Date.now = jest.fn(() => new Date(Date.UTC(2020, 0, 1)).valueOf());

    const allCompletedTasks = [
      {
        _id: "__ID__",
        email: "test@gmail.com",
        taskName: "__TASK_ONE__",
        taskDescription: "__TASK_DESCRIPTION__",
        taskCreateDate: "2020-01-01T12:00:00.000Z",
        taskDueDate: "2020-01-02T12:00:00.000Z",
        taskPriority: "Medium",
        taskDifficulty: "Medium",
        isTaskComplete: true,
        isTaskSuggested: false,
        taskGroup: 3,
        taskTotalPoints: 0,
        taskCompleteDate: "2020-01-01T18:00:00.000Z",
        taskUpdateDate: "2020-01-01T14:00:00.000Z"
      },
      {
        _id: "__ID_TWO__",
        email: "test@gmail.com",
        taskName: "__TASK_TWO_",
        taskDescription: "__TASK_DESCRIPTION__",
        taskCreateDate: "2020-01-01T12:01:00.000Z",
        taskDueDate: "2020-01-02T12:00:00.000Z",
        taskPriority: "Medium",
        taskDifficulty: "Medium",
        isTaskComplete: true,
        isTaskSuggested: false,
        taskGroup: 1,
        taskTotalPoints: 1,
        taskCompleteDate: "2020-01-01T14:01:00.000Z",
        taskUpdateDate: "2020-01-01T14:01:00.000Z"
      },
      {
        _id: "__ID_THREE__",
        email: "test@gmail.com",
        taskName: "__TASK_THREE__",
        taskDescription: "__TASK_DESCRIPTION__",
        taskCreateDate: "2020-01-01T12:02:00.000Z",
        taskDueDate: "2020-01-02T12:00:00.000Z",
        taskPriority: "Medium",
        taskDifficulty: "Medium",
        isTaskComplete: true,
        isTaskSuggested: false,
        taskGroup: 2,
        taskTotalPoints: 2,
        taskCompleteDate: "2020-01-10T12:00:00.000Z",
        taskUpdateDate: "2020-01-10T12:00:00.000Z"
      }
    ];

    expect(getCompletedTasksForToday(allCompletedTasks)).toBe(2);
  });

  it("should return 0 completed tasks for today when there are no completed today", () => {
    Date.now = jest.fn(() => new Date(Date.UTC(2020, 0, 1)).valueOf());

    const allCompletedTasks = [
      {
        _id: "__ID__",
        email: "test@gmail.com",
        taskName: "__TASK_ONE__",
        taskDescription: "__TASK_DESCRIPTION__",
        taskCreateDate: "2020-01-01T12:00:00.000Z",
        taskDueDate: "2020-01-02T12:00:00.000Z",
        taskPriority: "Medium",
        taskDifficulty: "Medium",
        isTaskComplete: true,
        isTaskSuggested: false,
        taskGroup: 3,
        taskTotalPoints: 0,
        taskCompleteDate: "2020-01-02T18:00:00.000Z",
        taskUpdateDate: "2020-01-01T14:00:00.000Z"
      },
      {
        _id: "__ID_TWO__",
        email: "test@gmail.com",
        taskName: "__TASK_TWO_",
        taskDescription: "__TASK_DESCRIPTION__",
        taskCreateDate: "2020-01-01T12:01:00.000Z",
        taskDueDate: "2020-01-02T12:00:00.000Z",
        taskPriority: "Medium",
        taskDifficulty: "Medium",
        isTaskComplete: true,
        isTaskSuggested: false,
        taskGroup: 1,
        taskTotalPoints: 1,
        taskCompleteDate: "2020-01-04T14:01:00.000Z",
        taskUpdateDate: "2020-01-01T14:01:00.000Z"
      },
      {
        _id: "__ID_THREE__",
        email: "test@gmail.com",
        taskName: "__TASK_THREE__",
        taskDescription: "__TASK_DESCRIPTION__",
        taskCreateDate: "2020-01-01T12:02:00.000Z",
        taskDueDate: "2020-01-02T12:00:00.000Z",
        taskPriority: "Medium",
        taskDifficulty: "Medium",
        isTaskComplete: true,
        isTaskSuggested: false,
        taskGroup: 2,
        taskTotalPoints: 2,
        taskCompleteDate: "2020-01-10T12:00:00.000Z",
        taskUpdateDate: "2020-01-10T12:00:00.000Z"
      }
    ];

    expect(getCompletedTasksForToday(allCompletedTasks)).toBe(0);
  });

  it("should return 3 completed tasks for this week when they are made complete", () => {
    Date.now = jest.fn(() => new Date(Date.UTC(2020, 0, 1)).valueOf());

    const allCompletedTasks = [
      {
        _id: "__ID__",
        email: "test@gmail.com",
        taskName: "__TASK_ONE__",
        taskDescription: "__TASK_DESCRIPTION__",
        taskCreateDate: "2020-01-01T12:00:00.000Z",
        taskDueDate: "2020-01-02T12:00:00.000Z",
        taskPriority: "Medium",
        taskDifficulty: "Medium",
        isTaskComplete: true,
        isTaskSuggested: false,
        taskGroup: 3,
        taskTotalPoints: 0,
        taskCompleteDate: "2020-01-01T18:00:00.000Z",
        taskUpdateDate: "2020-01-01T14:00:00.000Z"
      },
      {
        _id: "__ID_TWO__",
        email: "test@gmail.com",
        taskName: "__TASK_TWO_",
        taskDescription: "__TASK_DESCRIPTION__",
        taskCreateDate: "2020-01-01T12:01:00.000Z",
        taskDueDate: "2020-01-02T12:00:00.000Z",
        taskPriority: "Medium",
        taskDifficulty: "Medium",
        isTaskComplete: true,
        isTaskSuggested: false,
        taskGroup: 1,
        taskTotalPoints: 1,
        taskCompleteDate: "2020-01-02T14:01:00.000Z",
        taskUpdateDate: "2020-01-01T14:01:00.000Z"
      },
      {
        _id: "__ID_THREE__",
        email: "test@gmail.com",
        taskName: "__TASK_THREE__",
        taskDescription: "__TASK_DESCRIPTION__",
        taskCreateDate: "2020-01-01T12:02:00.000Z",
        taskDueDate: "2020-01-02T12:00:00.000Z",
        taskPriority: "Medium",
        taskDifficulty: "Medium",
        isTaskComplete: true,
        isTaskSuggested: false,
        taskGroup: 2,
        taskTotalPoints: 2,
        taskCompleteDate: "2020-01-05T10:00:00.000Z",
        taskUpdateDate: "2020-01-05T12:00:00.000Z"
      },
      {
        _id: "__ID_FOUR__",
        email: "test@gmail.com",
        taskName: "__TASK_FOUR__",
        taskDescription: "__TASK_DESCRIPTION__",
        taskCreateDate: "2020-01-01T12:03:00.000Z",
        taskDueDate: "2020-01-02T12:00:00.000Z",
        taskPriority: "Medium",
        taskDifficulty: "Medium",
        isTaskComplete: true,
        isTaskSuggested: false,
        taskGroup: 2,
        taskTotalPoints: 2,
        taskCompleteDate: "2020-01-06T12:00:00.000Z",
        taskUpdateDate: "2020-01-06T12:00:00.000Z"
      }
    ];

    expect(getCompletedTasksForThisWeek(allCompletedTasks)).toBe(3);
  });

  it("should return 0 completed tasks for this week when there are no complete this week", () => {
    Date.now = jest.fn(() => new Date(Date.UTC(2020, 0, 1)).valueOf());

    const allCompletedTasks = [
      {
        _id: "__ID__",
        email: "test@gmail.com",
        taskName: "__TASK_ONE__",
        taskDescription: "__TASK_DESCRIPTION__",
        taskCreateDate: "2019-12-26T12:00:00.000Z",
        taskDueDate: "2020-01-02T12:00:00.000Z",
        taskPriority: "Medium",
        taskDifficulty: "Medium",
        isTaskComplete: true,
        isTaskSuggested: false,
        taskGroup: 3,
        taskTotalPoints: 0,
        taskCompleteDate: "2019-12-29T18:00:00.000Z",
        taskUpdateDate: "2019-12-29T14:00:00.000Z"
      },
      {
        _id: "__ID_TWO__",
        email: "test@gmail.com",
        taskName: "__TASK_TWO_",
        taskDescription: "__TASK_DESCRIPTION__",
        taskCreateDate: "2020-01-01T12:01:00.000Z",
        taskDueDate: "2020-01-02T12:00:00.000Z",
        taskPriority: "Medium",
        taskDifficulty: "Medium",
        isTaskComplete: true,
        isTaskSuggested: false,
        taskGroup: 1,
        taskTotalPoints: 1,
        taskCompleteDate: "2020-01-07T14:01:00.000Z",
        taskUpdateDate: "2020-01-07T14:01:00.000Z"
      },
      {
        _id: "__ID_THREE__",
        email: "test@gmail.com",
        taskName: "__TASK_THREE__",
        taskDescription: "__TASK_DESCRIPTION__",
        taskCreateDate: "2020-01-01T12:02:00.000Z",
        taskDueDate: "2020-01-02T12:00:00.000Z",
        taskPriority: "Medium",
        taskDifficulty: "Medium",
        isTaskComplete: true,
        isTaskSuggested: false,
        taskGroup: 2,
        taskTotalPoints: 2,
        taskCompleteDate: "2020-02-05T10:00:00.000Z",
        taskUpdateDate: "2020-02-05T12:00:00.000Z"
      },
      {
        _id: "__ID_FOUR__",
        email: "test@gmail.com",
        taskName: "__TASK_FOUR__",
        taskDescription: "__TASK_DESCRIPTION__",
        taskCreateDate: "2020-01-01T12:03:00.000Z",
        taskDueDate: "2020-01-02T12:00:00.000Z",
        taskPriority: "Medium",
        taskDifficulty: "Medium",
        isTaskComplete: true,
        isTaskSuggested: false,
        taskGroup: 2,
        taskTotalPoints: 2,
        taskCompleteDate: "2020-01-10T12:00:00.000Z",
        taskUpdateDate: "2020-01-10T12:00:00.000Z"
      }
    ];

    expect(getCompletedTasksForThisWeek(allCompletedTasks)).toBe(0);
  });
});
