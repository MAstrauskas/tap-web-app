import React from "react";
import { render, cleanup } from "@testing-library/react";
import { useAuth0 } from "../../../react-auth0-spa";

import Button from "../Button";

afterEach(cleanup);

jest.mock("../../../react-auth0-spa");

describe("Button", () => {
  beforeEach(() => {
    // Mock Auth0 and return logged out state
    useAuth0.mockReturnValue({
      isAuthenticated: false,
      logout: jest.fn(),
      loginWithRedirect: jest.fn()
    });
  });

  it("renders correctly", () => {
    const {} = render(<Button />);
  });

  it("shows correct title", () => {
    const { getByText } = render(<Button title="Submit" />);

    getByText("Submit");
  });
});
