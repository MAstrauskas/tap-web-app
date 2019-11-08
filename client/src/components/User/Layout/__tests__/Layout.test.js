import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";

import Layout from "../Layout";

describe("Layout", () => {
  it("renders navigation inside layout", () => {
    const { getByTestId } = render(
      <Router>
        <Layout />
      </Router>
    );

    getByTestId("navigation");
  });

  it("renders side navigation inside layout", () => {
    const { getByTestId } = render(
      <Router>
        <Layout />
      </Router>
    );

    getByTestId("side-navigation");
  });
});
