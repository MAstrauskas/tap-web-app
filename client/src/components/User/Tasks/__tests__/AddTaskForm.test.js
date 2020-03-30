import React from "react";
import { render, fireEvent, getByText } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { useAuth0 } from "../../../../react-auth0-spa";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import LuxonUtils from "@date-io/luxon";
import AddTask from "../AddTaskForm";

jest.mock("../../../../react-auth0-spa");

describe("Add Task", () => {
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
  });

  it("renders correctly", () => {
    const { getByTestId } = render(
      <Router>
        <MuiPickersUtilsProvider utils={LuxonUtils}>
          <Link>
            <AddTask userEmail={user.email} token={token} />
          </Link>
        </MuiPickersUtilsProvider>
      </Router>
    );

    expect(getByTestId("add-task-form")).toBeVisible();
  });

  it("should add a task correctly", () => {
    const body = {
      email: user.email,
      taskName: "__TASK_ONE__",
      taskDescription: "__DESCRIPTION__",
      taskCreateDate: Date.now(),
      taskDueDate: Date.now(),
      taskPriority: "High",
      taskDifficulty: "Medium",
      isTaskComplete: false,
      isTaskSuggested: false
    };

    const { getByDisplayValue, getByTestId, getByLabelText } = render(
      <Router>
        <MuiPickersUtilsProvider utils={LuxonUtils}>
          <Link>
            <AddTask userEmail={user.email} token={token} />
          </Link>
        </MuiPickersUtilsProvider>
      </Router>
    );

    const taskNameInput = getByLabelText("Name", {
      exact: false,
      selector: "input"
    });
    const descriptionInput = getByLabelText("Description", {
      exact: false,
      selector: "input"
    });
    const priorityWrapper = getByTestId("task-priority");
    const difficultyWrapper = getByTestId("task-difficulty");

    fireEvent.change(taskNameInput, {
      target: { value: "__TASK_ONE__" }
    });

    expect(getByTestId("add-task-form")).toBeVisible();

    expect(getByDisplayValue("__TASK_ONE__")).toBeVisible();

    fireEvent.change(descriptionInput, {
      target: { value: "__DESCRIPTION__" }
    });

    expect(getByDisplayValue("__DESCRIPTION__")).toBeVisible();

    fireEvent.change(priorityWrapper.childNodes[1], {
      target: { value: "High" }
    });

    expect(getByDisplayValue("High")).toHaveValue("High");

    fireEvent.change(difficultyWrapper.childNodes[1], {
      target: { value: "Medium" }
    });

    expect(getByDisplayValue("Medium")).toHaveValue("Medium");

    fireEvent.click(getByTestId("add-button"));

    mock.onPost("/api/tasks/add", body).reply(200, data);
    mock.onGet(`/api/tasks/calculate-suggest/${user.email}`).reply(200);
    mock.onGet(`/api/tasks/make-suggest/${user.email}`).reply(200);
  });
});
