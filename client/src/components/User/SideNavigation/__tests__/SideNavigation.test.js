import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { useAuth0 } from "../../../../react-auth0-spa";

import Navigation from "../SideNavigation";

const user = {
  email: "test@test.com",
  fullName: "Test Test",
  email_verified: true,
  sub: "google-oauth2|231231232"
};

jest.mock("../../../../react-auth0-spa");

describe("Side Navigation", () => {
  beforeEach(() => {
    // Mock Auth0 and return logged out state
    useAuth0.mockReturnValue({
      isAuthenticated: false,
      user,
      logout: jest.fn(),
      loginWithRedirect: jest.fn()
    });
  });

  it("has Today link", () => {
    const { getByText } = render(
      <Router>
        <Navigation />
      </Router>
    );

    getByText("Today");
  });

  it("has All Tasks link", () => {
    const { getByText } = render(
      <Router>
        <Navigation />
      </Router>
    );

    getByText("All Tasks");
  });

  it("has Summary link", () => {
    const { getByText } = render(
      <Router>
        <Navigation />
      </Router>
    );

    getByText("Summary");
  });

  it("has Add a Task link", () => {
    const { getByText } = render(
      <Router>
        <Navigation />
      </Router>
    );

    getByText("Add a Task");
  });

  it("has Moodist link", () => {
    const { getByText } = render(
      <Router>
        <Navigation />
      </Router>
    );

    getByText("Moodist");
  });
});
