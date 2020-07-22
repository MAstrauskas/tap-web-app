import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter as Router } from "react-router-dom";
import { useAuth0 } from "../../../../react-auth0-spa";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import Home from "../Home";

jest.mock("../../../../react-auth0-spa");

describe("Home", () => {
  const mock = new MockAdapter(axios);

  const user = {
    email: "test@test.com",
    name: "__FULL_NAME__",
    email_verified: true,
    sub: "__SUB__",
    isAuthenticated: true,
  };

  const token = "__TOKEN__";

  const data = {
    tasks: [
      {
        _id: "__ID__",
        email: user.email,
        taskName: "__TASK_NAME_1_",
        taskDescription: "__TASK_DESCRIPTION__",
        taskCreateDate: "2020-01-27T04:59:03.388Z",
        taskDueDate: "2020-01-28T04:00:00.000Z",
        taskPriority: "Low",
        taskDifficulty: "Easy",
        isTaskComplete: false,
        isTaskSuggested: false,
        __v: 0,
        taskGroup: 3,
        taskTotalPoints: 1.5,
      },
      {
        _id: "__ID__",
        email: user.email,
        taskName: "__TASK_NAME_2__",
        taskDescription: "",
        taskCreateDate: "2020-01-27T05:23:03.388Z",
        taskDueDate: "2020-01-29T04:00:00.000Z",
        taskPriority: "Low",
        taskDifficulty: "Hard",
        isTaskComplete: true,
        isTaskSuggested: false,
        __v: 0,
        taskGroup: 3,
        taskTotalPoints: 1.5,
      },
    ],
  };

  const registeredUser = {
    name: user.name,
    email: user.email,
  };

  beforeEach(() => {
    // Mock Auth0 and return logged out state
    useAuth0.mockReturnValue({
      isAuthenticated: true,
      user,
      logout: jest.fn(),
      loginWithRedirect: jest.fn(),
    });

    window.matchMedia = jest.fn().mockImplementation((query) => {
      return {
        matches: query === "(max-width: 800px)" ? true : false,
        media: "",
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
      };
    });

    mock.onPost("/api/user/add").reply(200, registeredUser);
    mock.onPost("/api/user/add").reply(200, data);
    mock.onGet(`/api/tasks/${user.email}`).reply(200, data);
  });

  it("renders mobile suggested table correctly", async () => {
    global.matchMedia = (media) => ({
      addListener: jest.fn(),
      removeListener: jest.fn(),
      matches: media === "(max-width: 800px)",
    });

    global.matchMedia(700);

    const { getByTestId } = render(
      <Router>
        <Home userEmail={user.email} token={token} />
      </Router>
    );

    getByTestId("Suggested Tasks mobile table");
  });

  it("renders desktop suggested table correctly", async () => {
    global.matchMedia = (media) => ({
      addListener: jest.fn(),
      removeListener: jest.fn(),
      matches: media === "(min-width: 801px)",
    });

    global.matchMedia(900);

    const { getByTestId } = render(
      <Router>
        <Home userEmail={user.email} token={token} />
      </Router>
    );

    getByTestId("Suggested Tasks desktop table");
  });

  it("should delete a task", async () => {
    const suggestedTasks = {
      tasks: [
        {
          _id: "__ID__",
          email: user.email,
          taskName: "__TASK_NAME_1_",
          taskDescription: "__TASK_DESCRIPTION__",
          taskCreateDate: "2020-01-27T04:59:03.388Z",
          taskDueDate: "2020-03-27T04:00:00.000Z",
          taskPriority: "High",
          taskDifficulty: "Easy",
          isTaskComplete: false,
          isTaskSuggested: true,
          taskGroup: 1,
          taskTotalPoints: 2,
        },
        {
          _id: "__ID_2__",
          email: user.email,
          taskName: "__TASK_NAME_2_",
          taskDescription: "__TASK_DESCRIPTION__",
          taskCreateDate: "2020-01-27T04:59:03.388Z",
          taskDueDate: "2020-03-27T04:00:00.000Z",
          taskPriority: "High",
          taskDifficulty: "Easy",
          isTaskComplete: false,
          isTaskSuggested: true,
          taskGroup: 1,
          taskTotalPoints: 2,
        },
      ],
    };

    const tasksAfterDelete = {
      tasks: [
        {
          _id: "__ID_2__",
          email: user.email,
          taskName: "__TASK_NAME_2_",
          taskDescription: "__TASK_DESCRIPTION__",
          taskCreateDate: "2020-01-27T04:59:03.388Z",
          taskDueDate: "2020-03-27T04:00:00.000Z",
          taskPriority: "High",
          taskDifficulty: "Easy",
          isTaskComplete: false,
          isTaskSuggested: true,
          taskGroup: 1,
          taskTotalPoints: 2,
        },
      ],
    };

    mock.onPost("/api/user/add").reply(200, registeredUser);
    mock.onDelete(`/api/tasks/delete/${suggestedTasks.tasks[0]._id}`);
    mock.onGet(`/api/tasks/${user.email}`).reply(200, tasksAfterDelete);
  });

  it("should complete a task", async () => {
    const tasksBeforeComplete = {
      tasks: [
        {
          _id: "__ID__",
          email: user.email,
          taskName: "__TASK_NAME_1_",
          taskDescription: "__TASK_DESCRIPTION__",
          taskCreateDate: "2020-01-27T04:59:03.388Z",
          taskDueDate: "2020-03-27T04:00:00.000Z",
          taskPriority: "High",
          taskDifficulty: "Easy",
          isTaskComplete: false,
          isTaskSuggested: true,
          taskGroup: 1,
          taskTotalPoints: 2,
        },
        {
          _id: "__ID_2__",
          email: user.email,
          taskName: "__TASK_NAME_2_",
          taskDescription: "__TASK_DESCRIPTION__",
          taskCreateDate: "2020-01-27T04:59:03.388Z",
          taskDueDate: "2020-03-27T04:00:00.000Z",
          taskPriority: "High",
          taskDifficulty: "Easy",
          isTaskComplete: false,
          isTaskSuggested: true,
          taskGroup: 1,
          taskTotalPoints: 2,
        },
      ],
    };

    const tasksAfterComplete = {
      tasks: [
        {
          _id: "__ID__",
          email: user.email,
          taskName: "__TASK_NAME_1_",
          taskDescription: "__TASK_DESCRIPTION__",
          taskCreateDate: "2020-01-27T04:59:03.388Z",
          taskDueDate: "2020-03-27T04:00:00.000Z",
          taskPriority: "High",
          taskDifficulty: "Easy",
          isTaskComplete: true,
          isTaskSuggested: true,
          taskGroup: 1,
          taskTotalPoints: 2,
        },
        {
          _id: "__ID_2__",
          email: user.email,
          taskName: "__TASK_NAME_2_",
          taskDescription: "__TASK_DESCRIPTION__",
          taskCreateDate: "2020-01-27T04:59:03.388Z",
          taskDueDate: "2020-03-27T04:00:00.000Z",
          taskPriority: "High",
          taskDifficulty: "Easy",
          isTaskComplete: false,
          isTaskSuggested: true,
          taskGroup: 1,
          taskTotalPoints: 2,
        },
      ],
    };

    mock.onPost("/api/user/add").reply(200, registeredUser);
    mock.onPost("/api/user/add").reply(200, tasksBeforeComplete);
    mock.onGet(`/api/tasks/${user.email}`).reply(200, tasksAfterComplete);
  });
});
