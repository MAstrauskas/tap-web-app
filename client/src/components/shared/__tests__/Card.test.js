import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter as Router } from "react-router-dom";
import SummaryCard from "../Card";

describe("All Tasks", () => {
  it("should swich between Today, Week and Total", async () => {
    const { getByTestId, findByText } = render(
      <Router>
        <SummaryCard
          type="success"
          color="success"
          defaultHeader="Completed tasks"
          secondHeader=""
          defaultTitle="Today complete"
          secondTitle="This Week"
          thirdTitle="Total complete"
          showButtons={true}
          defaultOption={1}
          secondOption={2}
          thirdOption={3}
        />
      </Router>
    );

    fireEvent.click(getByTestId("button-week"));

    expect(await findByText("Week")).toBeInTheDocument();
    expect(await findByText("This Week")).toBeInTheDocument();
    expect(await findByText("2")).toBeInTheDocument();

    fireEvent.click(getByTestId("button-total"));

    expect(await findByText("Total")).toBeInTheDocument();
    expect(await findByText("Total complete")).toBeInTheDocument();
    expect(await findByText("3")).toBeInTheDocument();

    fireEvent.click(getByTestId("button-today"));

    expect(await findByText("Today")).toBeInTheDocument();
    expect(await findByText("Today complete")).toBeInTheDocument();
    expect(await findByText("1")).toBeInTheDocument();
  });
});
