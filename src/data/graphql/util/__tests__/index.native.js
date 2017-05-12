import { platform, bundleId, version } from "../";

jest.mock("react-native-device-info", () => ({
  getBundleId: () => "com.wow",
  getVersion: () => "1.2.3",
}));

it("should have platform of web", () => {
  // RN defaults to ios
  expect(platform()).toEqual("ios");
});

it("should use deviceInfo for bundle", () => {
  expect(bundleId()).toEqual("com.wow");
});

it("should deviceInfo for version", () => {
  expect(version()).toEqual("1.2.3");
});
