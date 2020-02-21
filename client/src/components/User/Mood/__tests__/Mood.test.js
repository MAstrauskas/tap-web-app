import React from "react";
import { cleanup } from "@testing-library/react";
import { Link } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Enzyme, { render, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { useAuth0 } from "../../../../react-auth0-spa";

import Mood from "../Mood";

afterEach(cleanup);

Enzyme.configure({ adapter: new Adapter() });

const user = {
  email: "test@test.com",
  fullName: "Test Test",
  email_verified: true,
  sub: "google-oauth2|231231232"
};

jest.mock("../../../../react-auth0-spa");

describe("Add Mood", () => {
  beforeEach(() => {
    // Mock Auth0 and return logged out state
    useAuth0.mockReturnValue({
      isAuthenticated: true,
      user,
      logout: jest.fn(),
      loginWithRedirect: jest.fn()
    });
  });

  it("renders correctly", () => {
    render(
      <Router>
        <Link>
          <Mood userEmail={user.email} />
        </Link>
      </Router>
    );
  });

  it.skip("should add the mood if all props are passed", async () => {
    const values = {
      mood: "positive",
      moodMotivation: "Low",
      moodTired: "No",
      setSubmitting: jest.fn()
    };

    const setSubmitting = jest.fn();

    const wrapper = mount(
      <Router>
        <Mood userEmail={user.email} />
      </Router>
    );

    expect(wrapper.state().addSuccessful).toBe(false);

    await wrapper.instance().handleSubmit(values, { setSubmitting });
  });
});
