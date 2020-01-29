import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { useAuth0 } from "../../../react-auth0-spa";

import Error from "../Error";

const user = {
  email: "test@test.com",
  fullName: "Test Test",
  email_verified: true,
  sub: "google-oauth2|231231232"
};

jest.mock("../../../react-auth0-spa");

describe("Error", () => {
  beforeEach(() => {
    // Mock Auth0 and return logged out state
    useAuth0.mockReturnValue({
      isAuthenticated: false,
      user,
      logout: jest.fn(),
      loginWithRedirect: jest.fn()
    });
  });

  it("Shows unauthorized if errCode is 401 and user is not logged in", () => {
    const { getByText } = render(
      <Router>
        <Error errCode="401" />
      </Router>
    );

    getByText("401 - Unauthorized");
  });

  it("Shows page not found if errCode is not 401 and user is not logged in", () => {
    const { getByText } = render(
      <Router>
        <Error />
      </Router>
    );

    getByText("404 - page not found");
  });
});
