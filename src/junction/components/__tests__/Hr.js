import "react-native";
import React from "react";
// Note: test renderer must be required after react-native.
import renderer from "react-test-renderer";

import Hr, { helpers } from "../Hr";
const { lineStyles, wrapperStyles } = helpers;

describe("Styles", () => {
  it("should have line styles", () => {
    expect(lineStyles.resolve()).toBeDefined();
  });
  it("should have wrapper styles", () => {
    expect(wrapperStyles.resolve()).toBeDefined();
  });
  it("should have merged margin styles", () => {
    expect(lineStyles.resolve().margin).toEqual(8);
  });
  it("should merge prop styles", () => {
    expect(lineStyles.resolve({ style: { color: "blue" } }).color).toEqual(
      "blue",
    );
  });
});

describe("Hr", () => {
  it("should render", () => {
    renderer.create(<Hr />);
  });
});
