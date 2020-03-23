import React from "react";
import { render } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { useAuth0 } from "../../../../react-auth0-spa";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import LuxonUtils from "@date-io/luxon";
import EditTask from "../EditTask";

jest.mock("../../../../react-auth0-spa");

describe("Edit Task", () => {
  const user = {
    email: "test@test.com",
    fullName: "__FULL_NAME__",
    email_verified: true,
    sub: "__SUB__"
  };

  const token = "__TOKEN__";

  beforeEach(() => {
    // Mock Auth0 and return logged out state
    useAuth0.mockReturnValue({
      isAuthenticated: true,
      user,
      logout: jest.fn(),
      loginWithRedirect: jest.fn()
    });
  });

  it("renders correctly", () => {
    const history = createMemoryHistory();
    const state = { task: {} };

    history.push("/", state);

    render(
      <Router history={history}>
        <MuiPickersUtilsProvider utils={LuxonUtils}>
          <EditTask userEmail={user.email} token={token} />
        </MuiPickersUtilsProvider>
      </Router>
    );
  });

  it("has all the fields required", () => {
    const history = createMemoryHistory();
    const state = { task: {} };

    history.push("/", state);

    const { getByTestId } = render(
      <Router history={history}>
        <MuiPickersUtilsProvider utils={LuxonUtils}>
          <EditTask userEmail={user.email} token={token} />
        </MuiPickersUtilsProvider>
        ;
      </Router>
    );

    getByTestId("task-name");
    getByTestId("task-description");
    getByTestId("task-due-date");
    getByTestId("task-priority");
    getByTestId("task-difficulty");
  });
});
