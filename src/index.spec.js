import "react-native";
import React from "react";
import Counter from "./";

// Note: test renderer must be required after react-native.
import renderer from "react-test-renderer";

describe("Counter", () => {
  it("should run tests", () => {
    expect(true).toEqual(true);
  });

  it("renders correctly", () => {
    const tree = renderer.create(<Counter />);
  });
});
