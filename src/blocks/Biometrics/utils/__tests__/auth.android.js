import { isSupported, requestTouch } from "../auth.android.js";

describe("android auth utils", () => {
  it("should have an isSupported method", () => {
    expect(typeof isSupported).toEqual("function");
  });
  it("should have an requestTouch method", () => {
    expect(typeof requestTouch).toEqual("function");
  });
});
