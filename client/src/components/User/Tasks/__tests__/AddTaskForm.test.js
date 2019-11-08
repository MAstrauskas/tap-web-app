import React from "react";
import { render } from "@testing-library/react";
import AddTask from "../AddTaskForm";

describe("Add Task", () => {
  it("renders correctly", () => {
    const { getByText } = render(<AddTask />);
  });
});
