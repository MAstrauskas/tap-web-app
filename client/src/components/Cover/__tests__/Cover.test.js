import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";

import Cover from "../Cover";

describe("Cover", () => {
  it("has a tite", () => {
    const { getByTestId } = render(
      <Router>
        <Cover />
      </Router>
    );

    getByTestId("cover-title");
  });

  it("has a subtitle", () => {
    const { getByTestId } = render(
      <Router>
        <Cover />
      </Router>
    );

    getByTestId("cover-subtitle");
  });
});
