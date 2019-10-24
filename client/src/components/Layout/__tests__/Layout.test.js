import React from "react";
import { render } from "@testing-library/react";
import Layout from "../Layout";

describe("Layout", () => {
  it("renders navigation inside layout", () => {
    const { getByTestId } = render(<Layout />);

    getByTestId("navigation");
  });
});
