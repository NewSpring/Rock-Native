import "react-native";
import React from "react";
import { map, multiply } from "ramda";
// Note: test renderer must be required after react-native.
import renderer from "react-test-renderer";

import Heading, { H1, H2, H3, H4, H5, H6, helpers } from "../Heading";
import Defaults from "../../defaults";

const { headingStyles } = helpers;
const bodySize = Defaults.text.body.size;
const factors = Defaults.text.headings.sizeFactors;
const sizes = map(multiply(bodySize))(factors);

describe("Heading style", () => {
  it("should be aight with empty props", () => {
    expect(headingStyles.resolve());
  });

  it("should default text size", () => {
    expect(headingStyles.resolve().fontSize).toBeDefined();
  });

  it("should default font weight", () => {
    expect(headingStyles.resolve().fontWeight).toBeDefined();
  });

  it("should merge with original styles", () => {
    expect(
      headingStyles.resolve({
        style: { backgroundColor: "blue" },
      }).backgroundColor,
    ).toBeDefined();
  });

  it("should not remove original styles with merge", () => {
    expect(
      headingStyles.resolve({
        style: { backgroundColor: "blue" },
      }).fontSize,
    ).toBeDefined();
  });

  it("should use `is` prop to determine font size", () => {
    expect((headingStyles.resolve({ is: 3 }).fontSize = sizes[3]));
    expect((headingStyles.resolve({ is: 1 }).fontSize = sizes[1]));
  });

  it("should handle unexpected `is` values", () => {
    expect((headingStyles.resolve({ is: 0 }).fontSize = sizes[0]));
    expect((headingStyles.resolve({ is: -1 }).fontSize = sizes[0]));
    expect((headingStyles.resolve({ is: 7 }).fontSize = sizes[0]));
    expect((headingStyles.resolve({ is: "hey" }).fontSize = sizes[0]));
    expect((headingStyles.resolve({ is: null }).fontSize = sizes[0]));
    expect((headingStyles.resolve({ is: undefined }).fontSize = sizes[0]));
  });
});

describe("Heading", () => {
  it("renders", () => {
    renderer.create(<Heading />);
  });

  it("should change size with `is` prop", () => {
    const tree = renderer.create(<Heading is={3} />);
    expect(tree.toJSON().props.style.fontSize).toEqual(sizes[3]);
  });

  it("should pass props down", () => {
    const tree = renderer.create(<Heading is={3} selectable />);
    expect(tree.toJSON().props.selectable).toEqual(true);
  });

  it("should pass children down", () => {
    const tree = renderer.create(<Heading is={3} selectable>Harambe</Heading>);
    expect(tree.toJSON().children).toEqual(["Harambe"]);
  });
});

describe("Heading Aliases", () => {
  it("should match alias with equivalent `is` binding", () => {
    const h1 = renderer.create(<H1 />);
    const h2 = renderer.create(<H2 />);
    const h3 = renderer.create(<H3 />);
    const h4 = renderer.create(<H4 />);
    const h5 = renderer.create(<H5 />);
    const h6 = renderer.create(<H6 />);

    expect(h1.toJSON().props.style.fontSize).toEqual(sizes[1]);
    expect(h2.toJSON().props.style.fontSize).toEqual(sizes[2]);
    expect(h3.toJSON().props.style.fontSize).toEqual(sizes[3]);
    expect(h4.toJSON().props.style.fontSize).toEqual(sizes[4]);
    expect(h5.toJSON().props.style.fontSize).toEqual(sizes[5]);
    expect(h6.toJSON().props.style.fontSize).toEqual(sizes[6]);
  });
});
