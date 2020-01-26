import React from "react";
import { render } from "@testing-library/react";
import { useAuth0 } from "../../../react-auth0-spa";
import Navigation from "../Navigation";

import "jest-extended";

const user = {
  email: "test@test.com",
  fullName: "Test Test",
  email_verified: true,
  sub: "google-oauth2|231231232"
};

jest.mock("../../../react-auth0-spa");

describe("Navigation", () => {
  it("has logo and login/register links when not logged in", () => {
    // Mock Auth0 and return logged out state
    useAuth0.mockReturnValue({
      isAuthenticated: false,
      user,
      logout: jest.fn(),
      loginWithRedirect: jest.fn()
    });

    const { getByText } = render(<Navigation />);

    getByText("TAP");
    getByText("LOGIN / REGISTER");
  });

  it("does not have login/register links when logged in", () => {
    // Mock Auth0 and return logged out state
    useAuth0.mockReturnValue({
      isAuthenticated: true,
      user,
      logout: jest.fn(),
      loginWithRedirect: jest.fn()
    });

    const { getByText, queryByText } = render(<Navigation />);

    getByText("TAP");
    expect(queryByText("LOGIN / REGISTER")).toBeNull();
  });
});
