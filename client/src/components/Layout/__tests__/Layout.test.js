import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { useAuth0 } from "../../../react-auth0-spa";
import Layout from "../Layout";

const user = {
  email: "test@test.com",
  fullName: "Test Test",
  email_verified: true,
  sub: "google-oauth2|231231232"
};

jest.mock("../../../react-auth0-spa");

describe("Layout", () => {
  beforeEach(() => {
    // Mock Auth0 and return logged out state
    useAuth0.mockReturnValue({
      isAuthenticated: false,
      user,
      logout: jest.fn(),
      loginWithRedirect: jest.fn()
    });
  });

  it("renders navigation inside layout", () => {
    const { getByTestId } = render(
      <Router>
        <Layout />
      </Router>
    );

    getByTestId("navigation");
  });
});
