import React from "react";
import { render } from "@testing-library/react";
import Mood from "../Mood";

describe("Add Mood", () => {
  it("renders correctly", () => {
    const {} = render(<Mood />);
  });

  it("has all the fields required", () => {
    const { getByTestId } = render(<Mood />);

    getByTestId("mood-name");
    getByTestId("mood-motivation");
    getByTestId("mood-tired");
  });
});
