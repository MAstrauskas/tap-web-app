import React from "react";
import { render } from "@testing-library/react";
import Navigation from "../Navigation";

describe("Navigation", () => {
  it("has logo link", () => {
    const { getByText } = render(<Navigation />);

    getByText("TAP");
    getByText("Login");
    getByText("Register");
  });

  it("has login link", () => {
    const { getByText } = render(<Navigation />);

    getByText("Login");
  });

  it("has register link", () => {
    const { getByText } = render(<Navigation />);

    getByText("Register");
  });
});
