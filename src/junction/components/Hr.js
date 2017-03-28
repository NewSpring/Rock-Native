import React from "react";
import Style from "@jongold/further";
import { View } from "react-native";
import { mergePropStyle } from "../util";

const marginHalf = Style.of({ margin: 8 });

const lineStyles = Style(props => ({
  ...mergePropStyle(props),
  flex: 1,
  height: 1,
  backgroundColor: "black",
})).concat(marginHalf);

const wrapperStyles = Style.of({
  width: "100%",
  flexDirection: "row",
  alignItems: "center",
});

export const helpers = { lineStyles, wrapperStyles };

const Hr = props => (
  <View style={wrapperStyles.resolve(props)}>
    <View style={lineStyles.resolve(props)} />
  </View>
);

export default Hr;
