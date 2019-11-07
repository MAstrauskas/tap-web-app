import React from "react";
import { render } from "@testing-library/react";
import Navigation from "../SideNavigation";

describe("Side Navigation", () => {
  it("has Today link", () => {
    const { getByText } = render(<Navigation />);

    getByText("Today");
  });

  it("has All Tasks link", () => {
    const { getByText } = render(<Navigation />);

    getByText("All Tasks");
  });

  it("has Summary link", () => {
    const { getByText } = render(<Navigation />);

    getByText("Summary");
  });

  it("has Add a Task link", () => {
    const { getByText } = render(<Navigation />);

    getByText("Add a Task");
  });

  it("has Moodist link", () => {
    const { getByText } = render(<Navigation />);

    getByText("Moodist");
  });
});
