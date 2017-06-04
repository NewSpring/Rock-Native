import auth from "../auth.android.js";

describe("android auth utils", () => {
  it("should have an isSupported method on auth", () => {
    expect(typeof auth.isSupported).toEqual("function");
  });
  it("should have an authenticate method on auth", () => {
    expect(typeof auth.authenticate).toEqual("function");
  });
});
