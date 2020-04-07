import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { useAuth0 } from "../../../react-auth0-spa";
import Error from "../Error";

jest.mock("../../../react-auth0-spa");

describe("Error", () => {
  const user = {
    email: "test@test.com",
    fullName: "__FULL_NAME__",
    email_verified: true,
    sub: "__SUB__",
  };

  beforeEach(() => {
    // Mock Auth0 and return logged out state
    useAuth0.mockReturnValue({
      isAuthenticated: false,
      user,
      logout: jest.fn(),
      loginWithRedirect: jest.fn(),
    });
  });

  it("should show an error page if the wrong url is entered", () => {
    const { getByText } = render(
      <Router>
        <Error />
      </Router>
    );

    getByText("Looks like you've lost!");
    getByText("The page you have tried to access does not exist.");
  });
});
