import { platform, bundleId, version } from "../index.js";

it("should have platform of web", () => {
  expect(platform()).toEqual("web");
});

it("should use window location for bundle", () => {
  global.window = { location: { hostname: "wow" } };
  expect(bundleId()).toEqual("wow");
});

it("should use env for version", () => {
  global.process.env.BUILD = "1.2.3";
  expect(version()).toEqual("1.2.3");
});
