import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { useAuth0 } from "../../../../react-auth0-spa";
import { BrowserRouter as Router } from "react-router-dom";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import mediaQuery from "css-mediaquery";
import Welcome from "../Welcome";

jest.mock("../../../../react-auth0-spa");

describe("Welcome", () => {
  const mock = new MockAdapter(axios);

  const user = {
    email: "test@test.com",
    fullName: "__FULL_NAME__",
    email_verified: true,
    sub: "__SUB__",
  };

  const registeredUser = {
    name: user.fullName,
    email: user.email,
  };

  const token = "__TOKEN__";

  const data = {
    tasks: [],
  };

  const RealDate = Date;

  function mockDate(isoDate) {
    global.Date = class extends RealDate {
      constructor() {
        return new RealDate(isoDate);
      }
    };
  }

  function createMatchMedia(width) {
    return (query) => ({
      matches: mediaQuery.match(query, { width }),
      addListener: () => {},
      removeListener: () => {},
    });
  }

  beforeAll(() => {
    window.matchMedia = createMatchMedia(window.innerWidth);
  });

  beforeEach(() => {
    // Mock Auth0 and return logged out sta te
    useAuth0.mockReturnValue({
      isAuthenticated: true,
      user,
      logout: jest.fn(),
      loginWithRedirect: jest.fn(),
    });

    mock.onPost("/api/user/add").reply(200, registeredUser);
    mock.onGet(`/api/tasks/${user.email}`).reply(200, data);
  });

  afterEach(() => {
    global.Date = RealDate;
  });

  it("should render Welcome page", () => {
    const { getByTestId } = render(
      <Router>
        <Welcome name={user.fullName} userEmail={user.email} token={token} />
      </Router>
    );

    getByTestId("welcome-page");
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
        <Welcome name={user.fullName} userEmail={user.email} token={token} />
      </Router>
    );

    getByTestId("welcome-page");
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
        <Welcome name={user.fullName} userEmail={user.email} token={token} />
      </Router>
    );

    getByTestId("welcome-page");
  });

  it("should still show welcome page if user registration fails", () => {
    mock.onPost("/api/user/add").reply(400, user);

    const { getByTestId } = render(
      <Router>
        <Welcome name={user.fullName} userEmail={user.email} />
      </Router>
    );

    getByTestId("welcome-page");
  });

  it("should show correct morning message", () => {
    mockDate("2020-03-23T09:00:00.000Z");

    const { getByTestId } = render(
      <Router>
        <Welcome name={user.fullName} userEmail={user.email} token={token} />
      </Router>
    );

    getByTestId("greeting-morning");
  });

  it("should show correct afternoon message", () => {
    mockDate("2020-03-23T13:00:00.000Z");

    const { getByTestId } = render(
      <Router>
        <Welcome name={user.fullName} userEmail={user.email} token={token} />
      </Router>
    );

    getByTestId("greeting-afternoon");
  });

  it("should show correct evening message", () => {
    mockDate("2020-03-23T18:00:00.000Z");

    const { getByTestId } = render(
      <Router>
        <Welcome name={user.fullName} userEmail={user.email} token={token} />
      </Router>
    );

    getByTestId("greeting-evening");
  });
});
