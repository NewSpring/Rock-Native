/* there's nothing but blank exports in this file */
import DefaultAuth, {
  BiometricAuthButton,
  supportsBiometrics,
  authWithBiometrics,
} from "../index.web";
import { shallow } from "enzyme";

describe("Web Auth API", () => {
  it("should have a null BiometricAuthButton component", () => {
    const component = shallow(<BiometricAuthButton />);
    expect(component.html()).toBe(null);
  });
  it("should not support biometrics", async () => {
    const supported = await supportsBiometrics();
    expect(supported).toEqual(false);
  });
  it("should not authWithBiometrics", async () => {
    const authed = await authWithBiometrics();
    expect(authed).toEqual(false);
  });
  it("should export a default null component", () => {
    const component = shallow(<DefaultAuth />);
    expect(component.html()).toBe(null);
  });
});
