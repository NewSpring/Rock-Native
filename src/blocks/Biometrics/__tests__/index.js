
/* there's nothing but blank exports in this file */
import DefaultAuth, { UnwrappedAuth, Auth, supportsBiometrics, authWithBiometrics } from "../";
import { shallow } from "enzyme";

describe("web auth api", () => {
  it("should have a null UnwrappedAuth component", () => {
    const component = shallow(<UnwrappedAuth />);
    expect(component.html()).toBe(null);
  });
  it("should have a null auth component", () => {
    const component = shallow(<Auth />);
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
