import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { useAuth0 } from "../../../../react-auth0-spa";
import { BrowserRouter as Router } from "react-router-dom";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import mediaQuery from "css-mediaquery";
import { advanceTo, clear } from "jest-date-mock";
import Welcome from "../Welcome";
import { act } from "react-dom/test-utils";

jest.mock("../../../../react-auth0-spa");

function createMatchMedia(width) {
  return query => ({
    matches: mediaQuery.match(query, { width }),
    addListener: () => {},
    removeListener: () => {}
  });
}

describe("Welcome", () => {
  const mock = new MockAdapter(axios);

  const user = {
    email: "test@test.com",
    fullName: "__FULL_NAME__",
    email_verified: true,
    sub: "__SUB__"
  };

  const registeredUser = {
    name: user.fullName,
    email: user.email
  };

  const token = "__TOKEN__";

  const data = {
    tasks: []
  };

  beforeAll(() => {
    window.matchMedia = createMatchMedia(window.innerWidth);
  });

  beforeEach(() => {
    // Mock Auth0 and return logged out sta te
    useAuth0.mockReturnValue({
      isAuthenticated: true,
      user,
      logout: jest.fn(),
      loginWithRedirect: jest.fn()
    });

    mock.onPost("/api/user/add").reply(200, registeredUser);
    mock.onGet(`/api/tasks/${user.email}`).reply(200, data);
  });

  it("should render loading spinner", () => {
    const { getByTestId } = render(
      <Router>
        <Welcome name={user.fullName} userEmail={user.email} token={token} />
      </Router>
    );

    getByTestId("loading-spinner");
  });

  it("should render Welcome page", () => {
    const { getByTestId } = render(
      <Router>
        <Welcome name={user.fullName} userEmail={user.email} token={token} />
      </Router>
    );

    // Wait for spinner to finish loading
    setTimeout(() => {
      getByTestId("welcome-page");
    }, 2000);
  });

  it("should render tablet view", () => {
    global.matchMedia = media => ({
      addListener: jest.fn(),
      removeListener: jest.fn(),
      matches: media === "(max-width: 800px)"
    });

    global.matchMedia(700);

    const { getByTestId } = render(
      <Router>
        <Welcome name={user.fullName} userEmail={user.email} token={token} />
      </Router>
    );

    // Wait for spinner to finish loading
    setTimeout(() => {
      getByTestId("welcome-page");
    }, 2000);
  });

  it("should render mobile view", () => {
    global.matchMedia = media => ({
      addListener: jest.fn(),
      removeListener: jest.fn(),
      matches: media === "(max-width: 600px)"
    });

    global.matchMedia(400);

    const { getByTestId } = render(
      <Router>
        <Welcome name={user.fullName} userEmail={user.email} token={token} />
      </Router>
    );

    // Wait for spinner to finish loading
    setTimeout(() => {
      getByTestId("welcome-page");
    }, 2000);
  });

  it("should still show welcome page if user registration fails", () => {
    mock.onPost("/api/user/add").reply(400, user);

    const { getByTestId } = render(
      <Router>
        <Welcome name={user.fullName} userEmail={user.email} />
      </Router>
    );

    // Wait for spinner to finish loading
    setTimeout(() => {
      getByTestId("welcome-page");
    }, 2000);
  });
});
