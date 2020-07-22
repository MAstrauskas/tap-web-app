import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { useAuth0 } from "../../../../react-auth0-spa";
import { BrowserRouter as Router } from "react-router-dom";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import mediaQuery from "css-mediaquery";
import AllTasks, { sortByDate } from "../AllTasks";

jest.mock("../../../../react-auth0-spa");

describe("All Tasks", () => {
  const mock = new MockAdapter(axios);

  const user = {
    email: "test@gmail.com",
    fullName: "__FULL_NAME__",
    email_verified: true,
    sub: "__SUB__",
  };

  const registeredUser = {
    name: user.fullName,
    email: user.email,
  };

  const token = "__TOKEN__";

  const responseData = {
    tasks: [
      {
        _id: "__ID__",
        email: "test@gmail.com",
        taskName: "__TASK_ONE__",
        taskDescription: "__TASK_DESCRIPTION__",
        taskCreateDate: "2020-01-01T12:00:00.000Z",
        taskDueDate: "2020-01-02T12:00:00.000Z",
        taskPriority: "Medium",
        taskDifficulty: "Medium",
        isTaskComplete: false,
        isTaskSuggested: false,
        taskGroup: 3,
        taskTotalPoints: 0,
      },
      {
        _id: "__ID_TWO_",
        email: "test@gmail.com",
        taskName: "__TASK_TWO__",
        taskDescription: "__TASK_DESCRIPTION__",
        taskCreateDate: "2020-01-01T12:00:00.000Z",
        taskDueDate: "2020-01-02T12:00:00.000Z",
        taskPriority: "Medium",
        taskDifficulty: "Medium",
        isTaskComplete: false,
        isTaskSuggested: false,
        taskGroup: 3,
        taskTotalPoints: 0,
      },
    ],
  };

  function createMatchMedia(width) {
    return (query) => ({
      matches: mediaQuery.match(query, { width }),
      addListener: () => {},
      removeListener: () => {},
    });
  }

  beforeAll(() => {
    Date.now = jest.fn(() => new Date(Date.UTC(2020, 0, 1)).valueOf());

    window.matchMedia = createMatchMedia(window.innerWidth);
  });

  beforeEach(() => {
    // Mock Auth0 and return logged out state
    useAuth0.mockReturnValue({
      isAuthenticated: true,
      user,
      logout: jest.fn(),
      loginWithRedirect: jest.fn(),
    });

    mock.onPost("/api/user/add").reply(200, registeredUser);
    mock.onGet(`/api/tasks/${user.email}`).reply(200, responseData);
  });

  it("should render All Tasks page correctly", () => {
    const { getByTestId } = render(
      <Router>
        <AllTasks userEmail={user.email} token={token} />
      </Router>
    );

    expect(getByTestId("all-tasks-table")).toBeVisible();
    expect(getByTestId("action-messages")).toBeVisible();
  });

  it("should render mobile view", () => {
    global.matchMedia = (media) => ({
      addListener: jest.fn(),
      removeListener: jest.fn(),
      matches: media === "(max-width: 800px)",
    });

    global.matchMedia(500);

    const { getByTestId } = render(
      <Router>
        <AllTasks userEmail={user.email} token={token} />
      </Router>
    );

    expect(getByTestId("mobile-view")).toBeVisible();
  });

  it("should render desktop view", () => {
    global.matchMedia = (media) => ({
      addListener: jest.fn(),
      removeListener: jest.fn(),
      matches: media === "(min-width: 801px)",
    });

    global.matchMedia(850);

    const { getByTestId } = render(
      <Router>
        <AllTasks userEmail={user.email} token={token} />
      </Router>
    );

    expect(getByTestId("desktop-view")).toBeVisible();
  });

  it("should show a warning message when a button is pressed", async () => {
    mock.onGet(`/api/tasks/${user.email}`).reply(200, responseData);

    const { getByTestId, queryByTestId, queryAllByTestId, findByText } = render(
      <Router>
        <AllTasks userEmail={user.email} token={token} />
      </Router>
    );

    expect(getByTestId("desktop-view")).toBeVisible();

    expect(await findByText("__TASK_ONE__")).toBeInTheDocument();

    fireEvent.click(queryAllByTestId("warning-button")[0]);

    expect(queryByTestId("warning-message")).toBeVisible();
  });

  it("should delete a task after warning yes button is pressed", async () => {
    const dataAfterDelete = {
      tasks: [
        {
          _id: "__ID_TWO_",
          email: "test@gmail.com",
          taskName: "__TASK_TWO__",
          taskDescription: "__TASK_DESCRIPTION__",
          taskCreateDate: "2020-01-01T12:00:00.000Z",
          taskDueDate: "2020-01-02T12:00:00.000Z",
          taskPriority: "Medium",
          taskDifficulty: "Medium",
          isTaskComplete: false,
          isTaskSuggested: false,
          taskGroup: 3,
          taskTotalPoints: 0,
        },
      ],
    };

    const { getByTestId, queryByTestId, queryAllByTestId, findByText } = render(
      <Router>
        <AllTasks userEmail={user.email} token={token} />
      </Router>
    );

    expect(getByTestId("desktop-view")).toBeVisible();

    expect(await findByText("__TASK_ONE__")).toBeInTheDocument();

    fireEvent.click(queryAllByTestId("warning-button")[0]);

    expect(queryByTestId("warning-message")).toBeVisible();

    fireEvent.click(getByTestId("warning-button-yes"));

    mock.onDelete(`/api/tasks/delete/__ID__`).reply(200, dataAfterDelete);
  });

  it("should show undo message when task is completed", async () => {
    const requestData = {
      id: "__ID__",
      isTaskComplete: true,
      isTaskSuggested: false,
      taskUpdateDate: 1577836800000,
    };

    const { getByTestId, queryAllByTestId, findByText } = render(
      <Router>
        <AllTasks userEmail={user.email} token={token} />
      </Router>
    );

    mock.onGet(`/api/tasks/${user.email}`).reply(200, responseData);

    expect(getByTestId("desktop-view")).toBeVisible();

    expect(await findByText("__TASK_ONE__")).toBeInTheDocument();

    fireEvent.click(queryAllByTestId("make-task-complete")[0]);

    mock.onPatch("/api/tasks/completed", requestData).reply(200);

    expect(await findByText("UNDO")).toBeInTheDocument();
  });

  it("should undo the task when undo button is pressed", async () => {
    const requestData = {
      id: "__ID_TWO_",
      isTaskComplete: true,
      isTaskSuggested: false,
      taskUpdateDate: 1577836800000,
    };

    const undoRequestData = {
      id: "__ID_TWO_",
      isTaskComplete: false,
      isTaskSuggested: false,
      taskUpdateDate: 1577836800000,
    };

    const { getByTestId, queryAllByTestId, findByText } = render(
      <Router>
        <AllTasks userEmail={user.email} token={token} />
      </Router>
    );

    expect(getByTestId("desktop-view")).toBeVisible();

    expect(await findByText("__TASK_TWO__")).toBeInTheDocument();

    fireEvent.click(queryAllByTestId("make-task-complete")[1]);

    mock.onPatch("/api/tasks/completed", requestData).reply(200);

    expect(await findByText("UNDO")).toBeInTheDocument();

    fireEvent.click(getByTestId("undo-button"));

    mock.onPatch("/api/tasks/completed", undoRequestData).reply(200);

    mock.onGet(`/api/tasks/${user.email}`).reply(200, responseData);
  });

  it("should close undo message when close button is pressed", async () => {
    const requestData = {
      id: "__ID_TWO_",
      isTaskComplete: true,
      isTaskSuggested: false,
      taskUpdateDate: 1577836800000,
    };

    const { getByTestId, queryAllByTestId, findByText, debug } = render(
      <Router>
        <AllTasks userEmail={user.email} token={token} />
      </Router>
    );

    expect(getByTestId("desktop-view")).toBeVisible();

    expect(await findByText("__TASK_TWO__")).toBeInTheDocument();

    fireEvent.click(queryAllByTestId("make-task-complete")[1]);

    mock.onPatch("/api/tasks/completed", requestData).reply(200);

    expect(await findByText("UNDO")).toBeInTheDocument();

    fireEvent.click(getByTestId("close-undo-message"));
  });

  it("should return the same order of tasks if due date is the same", () => {
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
        taskTotalPoints: 0,
      },
      {
        _id: "__ID_TWO_",
        email: "test@gmail.com",
        taskName: "__TASK_TWO__",
        taskDescription: "__TASK_DESCRIPTION__",
        taskCreateDate: "2020-01-01T12:00:00.000Z",
        taskDueDate: "2020-01-10T12:00:00.000Z",
        taskPriority: "Medium",
        taskDifficulty: "Medium",
        isTaskComplete: false,
        isTaskSuggested: false,
        taskGroup: 3,
        taskTotalPoints: 0,
      },
    ];

    expect(sortByDate(tasks)).toStrictEqual(tasks);
  });

  it("should sort tasks by date", () => {
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
        taskTotalPoints: 0,
      },
      {
        _id: "__ID_TWO_",
        email: "test@gmail.com",
        taskName: "__TASK_TWO__",
        taskDescription: "__TASK_DESCRIPTION__",
        taskCreateDate: "2020-01-01T12:00:00.000Z",
        taskDueDate: "2020-01-02T12:00:00.000Z",
        taskPriority: "Medium",
        taskDifficulty: "Medium",
        isTaskComplete: false,
        isTaskSuggested: false,
        taskGroup: 3,
        taskTotalPoints: 0,
      },
    ];

    const expectedResult = [
      {
        _id: "__ID_TWO_",
        email: "test@gmail.com",
        taskName: "__TASK_TWO__",
        taskDescription: "__TASK_DESCRIPTION__",
        taskCreateDate: "2020-01-01T12:00:00.000Z",
        taskDueDate: "2020-01-02T12:00:00.000Z",
        taskPriority: "Medium",
        taskDifficulty: "Medium",
        isTaskComplete: false,
        isTaskSuggested: false,
        taskGroup: 3,
        taskTotalPoints: 0,
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
        taskTotalPoints: 0,
      },
    ];

    expect(sortByDate(tasks)).toStrictEqual(expectedResult);
  });

  it("should sort out completed tasks", () => {
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
        taskTotalPoints: 0,
      },
      {
        _id: "__ID_TWO_",
        email: "test@gmail.com",
        taskName: "__TASK_TWO__",
        taskDescription: "__TASK_DESCRIPTION__",
        taskCreateDate: "2020-01-01T12:00:00.000Z",
        taskDueDate: "2020-01-02T12:00:00.000Z",
        taskPriority: "Medium",
        taskDifficulty: "Medium",
        isTaskComplete: true,
        isTaskSuggested: false,
        taskGroup: 3,
        taskTotalPoints: 0,
      },
    ];

    const expectedResult = [
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
        taskTotalPoints: 0,
      },
    ];

    expect(sortByDate(tasks)).toStrictEqual(expectedResult);
  });
});
