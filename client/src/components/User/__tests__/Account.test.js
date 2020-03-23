import React from "react";
import { render } from "@testing-library/react";
import { useAuth0 } from "../../../react-auth0-spa";
import { BrowserRouter as Router } from "react-router-dom";
import Account from "../Account";

jest.mock("../../../react-auth0-spa");

describe("Account", () => {
  const user = {
    email: "test@test.com",
    fullName: "__FULL_NAME__",
    email_verified: true,
    sub: "__SUB__"
  };

  beforeEach(() => {
    // Mock Auth0 and return logged out state
    useAuth0.mockReturnValue({
      isAuthenticated: false,
      user,
      logout: jest.fn(),
      loginWithRedirect: jest.fn()
    });
  });

  it("renders Account details", () => {
    const { getByTestId } = render(
      <Router>
        <Account />
      </Router>
    );

    getByTestId("user-name");
    getByTestId("user-email");
  });
});
