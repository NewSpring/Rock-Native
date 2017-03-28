import Style from "@jongold/further";
import { Text } from "react-native";
import { mapProps } from "recompose";
import idx from "idx";

import { scaleFontSize, mergePropStyle } from "../util";
import Defaults from "../defaults";

// nullables
const bodySize = idx(Defaults, _ => _.text.body.size) || 18;
const bodyWeight = idx(Defaults, _ => _.text.body.weight) || "500";
const bqSize = idx(Defaults, _ => _.text.blockQuote.size) || 1.563;
const smallSize = idx(Defaults, _ => _.text.small.size) || 0.833;
const pSize = idx(Defaults, _ => _.text.p.size) || 1.2;

export const textStyles = Style(props => ({
  ...mergePropStyle(props),
  fontSize: bodySize,
  fontWeight: bodyWeight,
}));

export const helpers = { textStyles };

const customSizedText = sizeFactor =>
  mapProps(props => ({
    ...props,
    style: textStyles.map(scaleFontSize(sizeFactor)).resolve(props),
  }))(Text);

export const BlockQuote = customSizedText(bqSize);
export const Small = customSizedText(smallSize);
export const P = customSizedText(pSize);
export default customSizedText(1);
