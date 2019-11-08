import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";

import Navigation from "../Navigation";

describe("Navigation", () => {
  it("has logo link", () => {
    const { getByText } = render(
      <Router>
        <Navigation />
      </Router>
    );

    getByText("TAP");
  });

  it("has My Tasks link", () => {
    const { getByText } = render(
      <Router>
        <Navigation />
      </Router>
    );

    getByText("MY TASKS");
  });

  it("has Navigation", () => {
    const { getByTestId } = render(
      <Router>
        <Navigation />
      </Router>
    );

    getByTestId("navigation");
  });

  it("has Navigation links", () => {
    const { getByTestId } = render(
      <Router>
        <Navigation />
      </Router>
    );

    getByTestId("navigation-links");
  });
});
