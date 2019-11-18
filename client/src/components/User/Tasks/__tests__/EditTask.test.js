import React from "react";
import { render } from "@testing-library/react";
import { Link } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";

import EditTask from "../EditTask";

describe("Edit Task", () => {
  const task = {};

  it("renders correctly", () => {
    const props = {
      location: {
        state: {
          task: task
        }
      }
    };

    const { getByText } = render(
      <Router>
        {" "}
        <Link>
          <EditTask {...props} />
        </Link>
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
        <Link>
          <EditTask {...props} />
        </Link>
      </Router>
    );

    getByTestId("task-name");
    getByTestId("task-description");
    getByTestId("task-due-date");
    getByTestId("task-priority");
    getByTestId("task-difficulty");
  });
});
