import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { BrowserRouter as Router } from "react-router-dom";
import { useAuth0 } from "../../../../react-auth0-spa";
import Mood from "../Mood";

jest.mock("../../../../react-auth0-spa");

afterEach(cleanup);

describe("Mood", () => {
  const mock = new MockAdapter(axios);

  const user = {
    email: "test@test.com",
    fullName: "__FULL_NAME__",
    email_verified: true,
    sub: "__SUB__",
  };

  const token = "__TOKEN__";

  beforeEach(() => {
    // Mock Auth0 and return logged out state
    useAuth0.mockReturnValue({
      isAuthenticated: true,
      user,
      logout: jest.fn(),
      loginWithRedirect: jest.fn(),
    });
  });

  it("renders correctly", () => {
    render(
      <Router>
        <Mood userEmail={user.email} token={token} />
      </Router>
    );
  });

  it("should add a mood", () => {
    const moodRequest = {
      email: user.email,
      moodName: "Positive",
      moodMotivation: "High",
      isTired: false,
    };

    const { getByTestId, getByLabelText, getByDisplayValue } = render(
      <Router>
        <Mood userEmail={user.email} token={token} />
      </Router>
    );

    const moodWrapper = getByLabelText("mood");
    const moodPositiveRadioButton =
      moodWrapper.childNodes[2].childNodes[0].childNodes[0].childNodes[0];
    const motivationWrapper = getByTestId("mood-motivation");
    const motivationInput = motivationWrapper.childNodes[1];
    const tirednessWrapper = getByTestId("mood-tired");
    const tirednessInput = tirednessWrapper.childNodes[1];

    expect(getByTestId("Moodist form")).toBeVisible();

    fireEvent.click(moodPositiveRadioButton);

    expect(getByDisplayValue("positive")).toBeChecked();

    fireEvent.change(motivationInput, {
      target: { value: "High" },
    });

    expect(getByDisplayValue("High")).toHaveValue("High");

    fireEvent.change(tirednessInput, {
      target: { value: "No" },
    });

    expect(getByDisplayValue("No")).toHaveValue("No");

    fireEvent.click(getByTestId("add-mood-button"));

    mock.onPost("/api/mood/add").reply(200, moodRequest);
    mock.onGet(`/api/tasks/calculate-suggest/${user.email}`).reply(200);
    mock.onGet(`/api/tasks/make-suggest/${user.email}`).reply(200);
  });
});
