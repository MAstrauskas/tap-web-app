import React from "react";
import { render } from "@testing-library/react";
import Navigation from "../Navigation";

describe("Navigation", () => {
  it("has logo link", () => {
    const { getByText } = render(<Navigation />);

    getByText("TAP");
  });

  it("has Home link", () => {
    const { getByText } = render(<Navigation />);

    getByText("HOME");
  });

  it("has My Tasks link", () => {
    const { getByText } = render(<Navigation />);

    getByText("MY TASKS");
  });

  it("has Navigation", () => {
    const { getByTestId } = render(<Navigation />);

    getByTestId("navigation");
  });

  it("has Navigation links", () => {
    const { getByTestId } = render(<Navigation />);

    getByTestId("navigation-links");
  });
});
