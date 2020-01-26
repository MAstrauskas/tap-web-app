import React from "react";
import { render } from "@testing-library/react";
import { useAuth0 } from "../../../../react-auth0-spa";
import Mood from "../Mood";

const user = {
  email: "test@test.com",
  fullName: "Test Test",
  email_verified: true,
  sub: "google-oauth2|231231232"
};

jest.mock("../../../../react-auth0-spa");

describe("Add Mood", () => {
  beforeEach(() => {
    // Mock Auth0 and return logged out state
    useAuth0.mockReturnValue({
      isAuthenticated: false,
      user,
      logout: jest.fn(),
      loginWithRedirect: jest.fn()
    });
  });

  it("renders correctly", () => {
    const {} = render(<Mood />);
  });

  it("has all the fields required", () => {
    const { getByTestId } = render(<Mood />);

    getByTestId("mood-positive");
    getByTestId("mood-neutral");
    getByTestId("mood-negative");
    getByTestId("mood-motivation");
    getByTestId("mood-tired");
  });
});
