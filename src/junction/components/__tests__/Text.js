import "react-native";
import React from "react";
// Note: test renderer must be required after react-native.
import renderer from "react-test-renderer";

import Text, { BlockQuote, Small, P, helpers } from "../Text";
import Defaults from "../../defaults";

const { textStyles } = helpers;
const bodySize = Defaults.text.body.size;

describe("styles", () => {
  it("should render styles", () => {
    expect(textStyles.resolve()).toBeDefined();
  });
  it("should merge style prop", () => {
    expect(textStyles.resolve({ style: { color: "blue" } }).color).toEqual(
      "blue",
    );
  });
});

describe("Text", () => {
  it("should render `text`", () => {
    const tree = renderer.create(<Text />);
    expect(tree.toJSON().props.style.fontSize).toEqual(bodySize);
  });
  it("should pass children", () => {
    const tree = renderer.create(<Text>harambe</Text>);
    expect(tree.toJSON().children).toEqual(["harambe"]);
  });
  it("should pass other props", () => {
    const tree = renderer.create(<Text selectable />);
    expect(tree.toJSON().props.selectable).toEqual(true);
  });
});

describe("BlockQuote", () => {
  it("should render `text`", () => {
    const tree = renderer.create(<BlockQuote />);
    expect(tree.toJSON().props.style.fontSize).toEqual(
      bodySize * Defaults.text.blockQuote.size,
    );
  });
  it("should pass children", () => {
    const tree = renderer.create(<BlockQuote>harambe</BlockQuote>);
    expect(tree.toJSON().children).toEqual(["harambe"]);
  });
  it("should pass other props", () => {
    const tree = renderer.create(<BlockQuote selectable />);
    expect(tree.toJSON().props.selectable).toEqual(true);
  });
});

describe("Small", () => {
  it("should render `text`", () => {
    const tree = renderer.create(<Small />);
    expect(tree.toJSON().props.style.fontSize).toEqual(
      bodySize * Defaults.text.small.size,
    );
  });
  it("should pass children", () => {
    const tree = renderer.create(<Small>harambe</Small>);
    expect(tree.toJSON().children).toEqual(["harambe"]);
  });
  it("should pass other props", () => {
    const tree = renderer.create(<Small selectable />);
    expect(tree.toJSON().props.selectable).toEqual(true);
  });
});

describe("P", () => {
  it("should render `text`", () => {
    const tree = renderer.create(<P />);
    expect(tree.toJSON().props.style.fontSize).toEqual(
      bodySize * Defaults.text.p.size,
    );
  });
  it("should pass children", () => {
    const tree = renderer.create(<P>harambe</P>);
    expect(tree.toJSON().children).toEqual(["harambe"]);
  });
  it("should pass other props", () => {
    const tree = renderer.create(<P selectable />);
    expect(tree.toJSON().props.selectable).toEqual(true);
  });
});
