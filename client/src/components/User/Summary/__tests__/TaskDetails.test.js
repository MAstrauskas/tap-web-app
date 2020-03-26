import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { useAuth0 } from "../../../../react-auth0-spa";
import { BrowserRouter as Router } from "react-router-dom";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import mediaQuery from "css-mediaquery";
import TaskDetails from "../TaskDetails";

jest.mock("../../../../react-auth0-spa");

describe("TaskDetails", () => {
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
      taskUpdateDate: "2020-01-01T14:00:00.000Z"
    }
  ];

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
    mock.onGet(`/api/tasks/${user.email}`).reply(200, completedTasks);
  });

  it("should render Task details", () => {
    const { getByTestId } = render(
      <Router>
        <TaskDetails
          message="Check details"
          taskName={completedTasks[0].taskName}
          taskDescription={completedTasks[0].taskDescription}
          taskDueDate={completedTasks[0].taskDueDate}
          taskPriority={completedTasks[0].taskPriority}
          taskDifficulty={completedTasks[0].taskDifficulty}
        />
      </Router>
    );

    getByTestId("task-details-button");
  });

  it("should open Task details modal on a button click", () => {
    const { getByTestId, queryByTestId } = render(
      <Router>
        <TaskDetails
          message="Check details"
          taskName={completedTasks[0].taskName}
          taskDescription={completedTasks[0].taskDescription}
          taskDueDate={completedTasks[0].taskDueDate}
          taskPriority={completedTasks[0].taskPriority}
          taskDifficulty={completedTasks[0].taskDifficulty}
        />
      </Router>
    );

    fireEvent.click(getByTestId("task-details-button"));

    expect(queryByTestId("task-details")).toBeVisible();
  });

  it("should close Task details modal on a close button click", () => {
    const { getByTestId, queryByTestId } = render(
      <Router>
        <TaskDetails
          message="Check details"
          taskName={completedTasks[0].taskName}
          taskDescription={completedTasks[0].taskDescription}
          taskDueDate={completedTasks[0].taskDueDate}
          taskPriority={completedTasks[0].taskPriority}
          taskDifficulty={completedTasks[0].taskDifficulty}
        />
      </Router>
    );

    fireEvent.click(getByTestId("task-details-button"));

    expect(queryByTestId("task-details")).toBeVisible();

    fireEvent.click(getByTestId("close-task-details-button"));

    expect(queryByTestId("task-details")).not.toBeVisible();
  });
});
