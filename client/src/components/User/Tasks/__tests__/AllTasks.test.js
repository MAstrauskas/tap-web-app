import React from "react";
import { render } from "@testing-library/react";
import { useAuth0 } from "../../../../react-auth0-spa";

import AllTasks from "../AllTasks";

jest.mock("../../../../react-auth0-spa");

describe("All Tasks", () => {
  const user = {
    email: "test@test.com",
    fullName: "__FULL_NAME__",
    email_verified: true,
    sub: "__SUB__"
  };

  const token = "__TOKEN__";

  beforeEach(() => {
    // Mock Auth0 and return logged out state
    useAuth0.mockReturnValue({
      isAuthenticated: true,
      user,
      logout: jest.fn(),
      loginWithRedirect: jest.fn()
    });

    window.matchMedia = () => ({
      addListener: jest.fn(),
      removeListener: jest.fn()
    });
  });

  it("renders the page correctly", () => {
    const {} = render(<AllTasks userEmail={user.email} token={token} />);
  });
});
