import React from "react";
import { render } from "@testing-library/react";
import Cover from "../Cover";

describe("Cover", () => {
  it("has a tite", () => {
    const { getByTestId } = render(<Cover />);

    getByTestId("cover-title");
  });

  it("has a subtitle", () => {
    const { getByTestId } = render(<Cover />);

    getByTestId("cover-subtitle");
  });
});
