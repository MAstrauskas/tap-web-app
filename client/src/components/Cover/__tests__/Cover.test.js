import React from "react";
import { render } from "@testing-library/react";
import { useAuth0 } from "../../../react-auth0-spa";
import { BrowserRouter as Router } from "react-router-dom";

import Cover from "../Cover";

const user = {
  email: "test@test.com",
  fullName: "Test Test",
  email_verified: true,
  sub: "google-oauth2|231231232"
};

jest.mock("../../../react-auth0-spa");

describe("Cover", () => {
  beforeEach(() => {
    // Mock Auth0 and return logged out state
    useAuth0.mockReturnValue({
      isAuthenticated: false,
      user,
      logout: jest.fn(),
      loginWithRedirect: jest.fn()
    });
  });

  it("has a tite", () => {
    const { getByTestId } = render(
      <Router>
        <Cover />
      </Router>
    );

    getByTestId("cover-title");
  });

  it("has a subtitle", () => {
    const { getByTestId } = render(
      <Router>
        <Cover />
      </Router>
    );

    getByTestId("cover-subtitle");
  });
});
