import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter as Router } from "react-router-dom";
import { useAuth0 } from "../../../react-auth0-spa";
import Navigation from "../Navigation";

jest.mock("../../../react-auth0-spa");

describe("Navigation", () => {
  const user = {
    email: "test@test.com",
    fullName: "__FULL_NAME",
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

  it("renders a logo link", () => {
    const { getByText } = render(
      <Router>
        <Navigation />
      </Router>
    );

    getByText("TAP");
  });

  it("renders navigation", () => {
    const { getByTestId } = render(
      <Router>
        <Navigation />
      </Router>
    );

    getByTestId("navigation");
  });

  it("should render login/register buttons if not authenticated", () => {
    const { getByTestId, getByText } = render(
      <Router>
        <Navigation />
      </Router>
    );

    getByText("LOGIN / REGISTER");
    fireEvent.click(getByTestId("login-button"));
  });

  it("should logout when logout button is pressed", () => {
    // Authenticated
    useAuth0.mockReturnValue({
      isAuthenticated: true,
      user,
      logout: jest.fn(),
      loginWithRedirect: jest.fn()
    });

    const { getByTestId, getByText } = render(
      <Router>
        <Navigation />
      </Router>
    );

    fireEvent.click(getByTestId("logout-button"));
    expect(useAuth0.isAuthenticated).toBeFalsy();
  });

  it("renders navigation links", () => {
    // Authenticated
    useAuth0.mockReturnValue({
      isAuthenticated: true,
      user,
      logout: jest.fn(),
      loginWithRedirect: jest.fn()
    });

    const { getByTestId } = render(
      <Router>
        <Navigation />
      </Router>
    );

    getByTestId("navigation-links");
  });

  it("should open a side menu", () => {
    // Authenticated
    useAuth0.mockReturnValue({
      isAuthenticated: true,
      user,
      logout: jest.fn(),
      loginWithRedirect: jest.fn()
    });

    const { getByTestId } = render(
      <Router>
        <Navigation />
      </Router>
    );

    fireEvent.click(getByTestId("user-menu"));

    getByTestId("navigation-links");
  });

  it("should open user settings menu", () => {
    // Authenticated
    useAuth0.mockReturnValue({
      isAuthenticated: true,
      user,
      logout: jest.fn(),
      loginWithRedirect: jest.fn()
    });

    const { queryByTestId, getByTestId } = render(
      <Router>
        <Navigation />
      </Router>
    );

    fireEvent.click(getByTestId("user-menu"));

    expect(queryByTestId("right-user-menu")).toBeVisible();
  });

  it("should close user settings menu", () => {
    // Authenticated
    useAuth0.mockReturnValue({
      isAuthenticated: true,
      user,
      logout: jest.fn(),
      loginWithRedirect: jest.fn()
    });

    const { queryByTestId, getByTestId } = render(
      <Router>
        <Navigation />
      </Router>
    );

    fireEvent.click(getByTestId("right-user-menu"));
    fireEvent.click(getByTestId("my-account-button"));

    expect(queryByTestId("right-user-menu")).not.toBeVisible();
  });

  it("should open side menu", () => {
    // Authenticated
    useAuth0.mockReturnValue({
      isAuthenticated: true,
      user,
      logout: jest.fn(),
      loginWithRedirect: jest.fn()
    });

    const { getByTestId, getByText } = render(
      <Router>
        <Navigation />
      </Router>
    );

    fireEvent.click(getByTestId("side-menu-button"));

    getByText("Today");
    getByText("All Tasks");
    getByText("Add a Task");
    getByText("Moodist");
    getByText("Summary");
    getByText("FAQ");
  });

  it("should close side menu", () => {
    // Authenticated
    useAuth0.mockReturnValue({
      isAuthenticated: true,
      user,
      logout: jest.fn(),
      loginWithRedirect: jest.fn()
    });

    const { getByTestId } = render(
      <Router>
        <Navigation />
      </Router>
    );

    fireEvent.click(getByTestId("side-menu-button"));
    fireEvent.click(getByTestId("today-link"));

    expect(getByTestId("side-menu-button")).toBeVisible();
  });
});
