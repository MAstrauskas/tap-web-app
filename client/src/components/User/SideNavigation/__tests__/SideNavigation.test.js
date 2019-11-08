import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";

import Navigation from "../SideNavigation";

describe("Side Navigation", () => {
  it("has Today link", () => {
    const { getByText } = render(
      <Router>
        <Navigation />
      </Router>
    );

    getByText("Today");
  });

  it("has All Tasks link", () => {
    const { getByText } = render(
      <Router>
        <Navigation />
      </Router>
    );

    getByText("All Tasks");
  });

  it("has Summary link", () => {
    const { getByText } = render(
      <Router>
        <Navigation />
      </Router>
    );

    getByText("Summary");
  });

  it("has Add a Task link", () => {
    const { getByText } = render(
      <Router>
        <Navigation />
      </Router>
    );

    getByText("Add a Task");
  });

  it("has Moodist link", () => {
    const { getByText } = render(
      <Router>
        <Navigation />
      </Router>
    );

    getByText("Moodist");
  });
});
