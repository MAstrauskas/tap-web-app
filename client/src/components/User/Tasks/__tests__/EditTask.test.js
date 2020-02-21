import React from "react";
import { render } from "@testing-library/react";
import { Link } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { useAuth0 } from "../../../../react-auth0-spa";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import LuxonUtils from "@date-io/luxon";

import EditTask from "../EditTask";

const user = {
  email: "test@test.com",
  fullName: "Test Test",
  email_verified: true,
  sub: "google-oauth2|231231232"
};

jest.mock("../../../../react-auth0-spa");

describe("Edit Task", () => {
  beforeEach(() => {
    // Mock Auth0 and return logged out state
    useAuth0.mockReturnValue({
      isAuthenticated: true,
      user,
      logout: jest.fn(),
      loginWithRedirect: jest.fn()
    });
  });

  const task = {};

  it("renders correctly", () => {
    const props = {
      location: {
        state: {
          task: task
        }
      }
    };

    render(
      <Router>
        <MuiPickersUtilsProvider utils={LuxonUtils}>
          <Link>
            <EditTask {...props} />
          </Link>
        </MuiPickersUtilsProvider>
      </Router>
    );
  });

  it("has all the fields required", () => {
    const props = {
      location: {
        state: {
          task: {}
        }
      }
    };

    const { getByTestId } = render(
      <Router>
        <MuiPickersUtilsProvider utils={LuxonUtils}>
          <Link>
            <EditTask {...props} />
          </Link>
        </MuiPickersUtilsProvider>
      </Router>
    );

    getByTestId("task-name");
    getByTestId("task-description");
    getByTestId("task-due-date");
    getByTestId("task-priority");
    getByTestId("task-difficulty");
  });
});
