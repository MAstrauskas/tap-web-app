import React from "react";
import { cleanup } from "@testing-library/react";
import Enzyme, { render, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { useAuth0 } from "../../../react-auth0-spa";

import Checkbox from "../Checkbox";

afterEach(cleanup);

Enzyme.configure({ adapter: new Adapter() });

jest.mock("../../../react-auth0-spa");

describe("Checkbox", () => {
  beforeEach(() => {
    // Mock Auth0 and return logged out state
    useAuth0.mockReturnValue({
      isAuthenticated: false,
      logout: jest.fn(),
      loginWithRedirect: jest.fn()
    });
  });

  it("renders correctly", () => {
    const {} = render(<Checkbox />);
  });

  it("should make task completed after clicking a checkbox", async () => {
    const handleComplete = jest.fn();

    const wrapper = mount(<Checkbox handleComplete={handleComplete} />);

    expect(wrapper.state().editSuccessful).toBe(false);

    await wrapper.instance().handleEdit();

    expect(wrapper.state().editSuccessful).toBe(true);
  });

  it("should throw an error if props are missing", async () => {
    const wrapper = mount(<Checkbox id={2} />);

    expect(wrapper.state().editSuccessful).toBe(false);

    await wrapper.instance().handleEdit();

    expect(wrapper.state().editSuccessful).toBe(false);
  });
});
