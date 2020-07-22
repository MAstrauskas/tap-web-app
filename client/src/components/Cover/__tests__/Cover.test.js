import React from "react";
import { render } from "@testing-library/react";
import { useAuth0 } from "../../../react-auth0-spa";
import { BrowserRouter as Router } from "react-router-dom";
import Cover from "../Cover";

jest.mock("../../../react-auth0-spa");

describe("Cover", () => {
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

  it("renders a title", () => {
    const { getByTestId } = render(
      <Router>
        <Cover />
      </Router>
    );

    getByTestId("cover-title");
  });

  it("renders a subtitle", () => {
    const { getByTestId } = render(
      <Router>
        <Cover />
      </Router>
    );

    getByTestId("cover-subtitle");
  });

  it("should render desktop view", () => {
    global.matchMedia = (media) => ({
      addListener: jest.fn(),
      removeListener: jest.fn(),
      matches: media === "(min-width: 801px)",
    });

    global.matchMedia(900);

    const { getByTestId } = render(
      <Router>
        <Cover />
      </Router>
    );

    getByTestId("cover-title");
    getByTestId("cover-subtitle");
  });

  it("should render tablet view", () => {
    global.matchMedia = (media) => ({
      addListener: jest.fn(),
      removeListener: jest.fn(),
      matches: media === "(max-width: 800px)",
    });

    global.matchMedia(700);

    const { getByTestId } = render(
      <Router>
        <Cover />
      </Router>
    );

    getByTestId("cover-title");
    getByTestId("cover-subtitle");
  });

  it("should render mobile view", () => {
    global.matchMedia = (media) => ({
      addListener: jest.fn(),
      removeListener: jest.fn(),
      matches: media === "(max-width: 600px)",
    });

    global.matchMedia(400);

    const { getByTestId } = render(
      <Router>
        <Cover />
      </Router>
    );

    getByTestId("cover-title");
    getByTestId("cover-subtitle");
  });
});
