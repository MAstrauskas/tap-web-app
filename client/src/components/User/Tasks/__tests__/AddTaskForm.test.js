import React from "react";
import { render } from "@testing-library/react";
import AddTask from "../AddTaskForm";

describe("Add Task", () => {
  it("renders correctly", () => {
    const {} = render(<AddTask />);
  });

  it("has all the fields required", () => {
    const { getByTestId } = render(<AddTask />);

    getByTestId("task-name");
    getByTestId("task-description");
    getByTestId("task-due-date");
    getByTestId("task-priority");
    getByTestId("task-difficulty");
  });
});
