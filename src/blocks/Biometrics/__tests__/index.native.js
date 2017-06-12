import {
  supportsBiometrics,
  authWithBiometrics,
  BiometricAuthButton,
} from "../index.native";
import { withSupportedState, withLifecycle } from "../utils/index.native";

import { shallow } from "enzyme";

function mockFunctions() {
  const original = require.requireActual("../utils/index.native");
  return {
    ...original, //Pass down all the exported objects
    withSupportedState: jest.fn(original.withSupportedState),
    withLifecycle: jest.fn(original.withLifecycle),
    authWithBiometrics: jest.fn(),
    supportsBiometrics: jest.fn(),
  };
}
jest.mock("../utils/index.native", () => mockFunctions());

describe("Native Auth API", () => {
  it("should have a supportsBiometrics export", () => {
    expect(supportsBiometrics).toBeDefined();
    expect(supportsBiometrics.mock).toBeDefined();
  });
  it("should have a authWithBiometrics export", () => {
    expect(authWithBiometrics).toBeDefined();
    expect(authWithBiometrics.mock).toBeDefined();
  });
  it("should have an BiometricAuthButton component export", () => {
    const component = shallow(<BiometricAuthButton supportsBiometrics />);
    expect(component.html()).not.toBe(null);
  });
  it("should call auth when button clicked", () => {
    authWithBiometrics.mockReset();
    const component = shallow(<BiometricAuthButton supportsBiometrics />);
    expect(component.html()).not.toBe(null);
    component.simulate("press");
    expect(authWithBiometrics).toHaveBeenCalled();
  });
  it("should not show button when auth isn't supported", () => {
    const component = shallow(<BiometricAuthButton />);
    expect(component.html()).toBe(null);
  });
  it("should default export a recompose HOC for state and lifecycle", () => {
    // There has got to be a better test for this.
    // This is for James to figure out. :party:
    const wrappedComponent = withSupportedState(
      withLifecycle(BiometricAuthButton),
    );
    expect(typeof wrappedComponent).toBe("function");
    expect(wrappedComponent.displayName).toBe(
      "withState(lifecycle(BiometricAuthButton))",
    );
  });
});
