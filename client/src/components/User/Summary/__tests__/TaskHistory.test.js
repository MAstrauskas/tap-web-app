import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { useAuth0 } from "../../../../react-auth0-spa";
import { BrowserRouter as Router } from "react-router-dom";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import mediaQuery from "css-mediaquery";
import TaskHistory from "../TaskHistory";

jest.mock("../../../../react-auth0-spa");

describe("TaskHistory", () => {
  const mock = new MockAdapter(axios);

  const user = {
    email: "test@test.com",
    fullName: "__FULL_NAME__",
    email_verified: true,
    sub: "__SUB__",
  };

  const registeredUser = {
    name: user.fullName,
    email: user.email,
  };

  const token = "__TOKEN__";

  const completedTasks = [
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
      taskUpdateDate: "2020-01-01T14:00:00.000Z",
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
      taskUpdateDate: "2020-01-01T14:01:00.000Z",
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
      taskUpdateDate: "2020-01-10T12:00:00.000Z",
    },
    {
      _id: "__ID_FOUR__",
      email: "test@gmail.com",
      taskName: "__TASK_FOUR__",
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
      taskUpdateDate: "2020-01-10T12:00:00.000Z",
    },
    {
      _id: "__ID_FIVE__",
      email: "test@gmail.com",
      taskName: "__TASK_FIVE__",
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
      taskUpdateDate: "2020-01-10T12:00:00.000Z",
    },
    {
      _id: "__ID_SIX__",
      email: "test@gmail.com",
      taskName: "__TASK_SIX__",
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
      taskUpdateDate: "2020-01-10T12:00:00.000Z",
    },
  ];

  function createMatchMedia(width) {
    return (query) => ({
      matches: mediaQuery.match(query, { width }),
      addListener: () => {},
      removeListener: () => {},
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
      loginWithRedirect: jest.fn(),
    });

    mock.onPost("/api/user/add").reply(200, registeredUser);
    mock.onGet(`/api/tasks/${user.email}`).reply(200, completedTasks);
  });

  it("should render Task history", () => {
    const { getByTestId } = render(
      <Router>
        <TaskHistory tasks={completedTasks} />
      </Router>
    );

    getByTestId("task-history");
    getByTestId("task-history-pagination");
  });

  it("should render tablet view", () => {
    global.matchMedia = (media) => ({
      addListener: jest.fn(),
      removeListener: jest.fn(),
      matches: media === "(max-width: 960px)",
    });

    global.matchMedia(700);
    window.matchMedia = createMatchMedia(700);

    const { getAllByTestId } = render(
      <Router>
        <TaskHistory tasks={completedTasks} />
      </Router>
    );

    getAllByTestId("task-details-button");
  });

  it("should change task details list page", () => {
    global.matchMedia = (media) => ({
      addListener: jest.fn(),
      removeListener: jest.fn(),
      matches: media === "(max-width: 960px)",
    });

    global.matchMedia(1200);
    window.matchMedia = createMatchMedia(1200);

    const { getByTitle, getByText, getAllByTestId } = render(
      <Router>
        <TaskHistory tasks={completedTasks} />
      </Router>
    );

    getAllByTestId("task-details-button");

    fireEvent.click(getByTitle("Next page"));

    // Task number currently displaying on the page
    getByText("6-6 of 6");
    getByText("__TASK_SIX__");
  });

  it("should change back task details list page", () => {
    global.matchMedia = (media) => ({
      addListener: jest.fn(),
      removeListener: jest.fn(),
      matches: media === "(max-width: 960px)",
    });

    global.matchMedia(1200);
    window.matchMedia = createMatchMedia(1200);

    const { getByTitle, getByText, getAllByTestId } = render(
      <Router>
        <TaskHistory tasks={completedTasks} />
      </Router>
    );

    getAllByTestId("task-details-button");

    fireEvent.click(getByTitle("Next page"));

    // Task number currently displaying on the page
    getByText("6-6 of 6");
    getByText("__TASK_SIX__");

    fireEvent.click(getByTitle("Previous page"));

    getByText("1-5 of 6");
    getByText("__TASK_ONE__");
  });
});
