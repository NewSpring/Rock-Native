import { isSupported, authenticate } from "../auth.ios.js";

describe("ios auth utils", () => {
  it("should have an isSupported method on auth", () => {
    expect(typeof isSupported).toEqual("function");
  });
  it("should have an authenticate method on auth", () => {
    expect(typeof authenticate).toEqual("function");
  });
});
