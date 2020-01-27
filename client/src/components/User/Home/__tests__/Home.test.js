import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { useAuth0 } from "../../../../react-auth0-spa";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import Home from "../Home";

const user = {
  email: "test@test.com",
  name: "Test",
  email_verified: true,
  sub: "google-oauth2|231231232"
};

jest.mock("../../../../react-auth0-spa");

describe("Home", () => {
  beforeEach(() => {
    // Mock Auth0 and return logged out state
    useAuth0.mockReturnValue({
      isAuthenticated: true,
      user,
      logout: jest.fn(),
      loginWithRedirect: jest.fn()
    });

    const mock = new MockAdapter(axios);
    const data = {
      tasks: [
        {
          _id: "5e2e6e17c4518d30158ede63",
          email: "test@gmails.com",
          taskName: "Test",
          taskDescription: "",
          taskCreateDate: "2020-01-27T04:59:03.388Z",
          taskDueDate: "2020-01-28T04:00:00.000Z",
          taskPriority: "Low",
          taskDifficulty: "Easy",
          isTaskComplete: false,
          isTaskSuggested: false,
          __v: 0,
          taskGroup: 3,
          taskTotalPoints: 1.5
        },
        {
          _id: "5e2e6e3253d4518d30158ede63",
          email: "test@gmails.com",
          taskName: "Test_2",
          taskDescription: "",
          taskCreateDate: "2020-01-27T05:23:03.388Z",
          taskDueDate: "2020-01-29T04:00:00.000Z",
          taskPriority: "Low",
          taskDifficulty: "Hard",
          isTaskComplete: true,
          isTaskSuggested: false,
          __v: 0,
          taskGroup: 3,
          taskTotalPoints: 1.5
        }
      ]
    };
    const registeredUser = {
      name: user.name,
      email: user.email
    };

    mock
      .onPost("http://localhost:9000/api/user/add")
      .reply(200, registeredUser);
    mock.onPost("http://localhost:9000/api/user/add").reply(200, data);
    mock
      .onGet(`http://localhost:9000/api/tasks/${user.email}`)
      .reply(200, data);
  });

  it("renders today's table correctly", async () => {
    const { getByText, getByTestId } = await render(
      <Router>
        <Home name={user.firstName} email={user.email} />
      </Router>
    );

    getByText("Today's tasks");
  });

  it("renders suggested table correctly", async () => {
    const { getByText } = await render(
      <Router>
        <Home name={user.firstName} email={user.email} />
      </Router>
    );

    getByText("Suggested tasks");
  });

  it("throws an error if user registrations fails", async () => {
    const mock = new MockAdapter(axios);
    const unregisteredUser = {
      name: user.name,
      email: user.email
    };
    const data = {
      tasks: [
        {
          _id: "5e2e6e17c4518d30158ede63",
          email: "test@gmails.com",
          taskName: "Test",
          taskDescription: "",
          taskCreateDate: "2020-01-27T04:59:03.388Z",
          taskDueDate: "2020-01-28T04:00:00.000Z",
          taskPriority: "Low",
          taskDifficulty: "Easy",
          isTaskComplete: false,
          isTaskSuggested: false,
          __v: 0,
          taskGroup: 3,
          taskTotalPoints: 1.5
        }
      ]
    };

    mock.onPost("http://localhost:9000/api/user/add").reply(200, data);
    mock
      .onGet(`http://localhost:9000/api/tasks/${user.email}`)
      .reply(200, data);
    mock
      .onPost("http://localhost:9000/api/user/add")
      .reply(404, unregisteredUser);

    const {} = render(
      <Router>
        <Home name={user.firstName} email={user.email} />
      </Router>
    );
  });
});
