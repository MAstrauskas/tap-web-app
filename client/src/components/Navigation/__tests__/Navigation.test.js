import React from "react";
import { render } from "@testing-library/react";
import Navigation from "../Navigation";

describe("Navigation", () => {
  it("has logo link", () => {
    const { getByText } = render(<Navigation />);

    getByText("TAP");
    getByText("LOGIN");
    getByText("REGISTER");
  });

  it("has login link", () => {
    const { getByText } = render(<Navigation />);

    getByText("LOGIN");
  });

  it("has register link", () => {
    const { getByText } = render(<Navigation />);

    getByText("REGISTER");
  });
});
