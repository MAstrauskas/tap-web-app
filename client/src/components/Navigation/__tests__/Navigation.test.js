import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { useAuth0 } from "../../../react-auth0-spa";

import Navigation from "../Navigation";

const user = {
  email: "test@test.com",
  fullName: "Test Test",
  email_verified: true,
  sub: "google-oauth2|231231232"
};

jest.mock("../../../react-auth0-spa");

describe("Navigation", () => {
  beforeEach(() => {
    // Mock Auth0 and return logged out state
    useAuth0.mockReturnValue({
      isAuthenticated: false,
      user,
      logout: jest.fn(),
      loginWithRedirect: jest.fn()
    });
  });

  it("has logo link", () => {
    const { getByText } = render(
      <Router>
        <Navigation />
      </Router>
    );

    getByText("TAP");
  });

  it("has Navigation", () => {
    const { getByTestId } = render(
      <Router>
        <Navigation />
      </Router>
    );

    getByTestId("navigation");
  });

  it("has Navigation links", () => {
    // Authenticated
    useAuth0.mockReturnValue({
      isAuthenticated: true,
      user,
      logout: jest.fn(),
      loginWithRedirect: jest.fn()
    });

    const { getByTestId } = render(
      <Router>
        <Navigation />
      </Router>
    );

    getByTestId("navigation-links");
  });
});
