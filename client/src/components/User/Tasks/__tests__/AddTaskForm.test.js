import React from "react";
import Enzyme, { render, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { useAuth0 } from "../../../../react-auth0-spa";

import AddTask from "../AddTaskForm";

Enzyme.configure({ adapter: new Adapter() });

const user = {
  email: "test@test.com",
  fullName: "Test Test",
  email_verified: true,
  sub: "google-oauth2|231231232"
};

jest.mock("../../../../react-auth0-spa");

describe("Add Task", () => {
  beforeEach(() => {
    // Mock Auth0 and return logged out state
    useAuth0.mockReturnValue({
      isAuthenticated: false,
      user,
      logout: jest.fn(),
      loginWithRedirect: jest.fn()
    });
  });

  it("renders correctly", () => {
    const {} = render(<AddTask />);
  });

  it("should add the task if all props are passed", async () => {
    const values = {
      taskName: "To do",
      taskDueDate: 1503123,
      taskDifficulty: "Hard",
      isTaskComplete: false,
      isTaskSuggested: false
    };

    const setSubmitting = jest.fn();

    const wrapper = mount(<AddTask userEmail={user.email} />);

    expect(wrapper.state().addSuccessful).toBe(false);

    await wrapper.instance().handleSubmit(values, { setSubmitting });
  });
});
