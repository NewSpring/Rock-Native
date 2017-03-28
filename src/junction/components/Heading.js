import Style from "@jongold/further";
import { Text } from "react-native";
import { mapProps } from "recompose";
import idx from "idx";
import { multiply, map } from "ramda";

import { mergePropStyle } from "../util";
import Defaults from "../defaults";

// nullables
const bodySize = idx(Defaults, _ => _.text.body.size) || 18;
const sizeFactors = idx(Defaults, _ => _.text.headings.sizeFactors) || [];
const fontWeight = idx(Defaults, _ => _.text.headings.weight) || "900";

const sizes = map(multiply(bodySize))(sizeFactors);

const headingStyles = Style(props => ({
  ...mergePropStyle(props),
  fontSize: typeof props.is === "number" &&
    props.is > 0 &&
    props.is < sizes.length
    ? sizes[props.is]
    : sizes[0],
  fontWeight: fontWeight,
}));

export const helpers = { headingStyles };

const Heading = mapProps(props => ({
  ...props,
  style: headingStyles.resolve(props),
}))(Text);

const headingIs = is =>
  mapProps(props => ({
    ...props,
    is: is,
    // accessibilityRole: "heading",
    // accessibilityLevel: is,
  }))(Heading);

export const H1 = headingIs(1);
export const H2 = headingIs(2);
export const H3 = headingIs(3);
export const H4 = headingIs(4);
export const H5 = headingIs(5);
export const H6 = headingIs(6);
export default Heading;
