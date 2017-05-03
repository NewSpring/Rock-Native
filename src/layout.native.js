// @flow

import { View } from "react-native";
import { layoutStyle } from "./";

export default ({ components }) => (
  <View style={layoutStyle.resolve()}>
    {components.map(({ ...rest, id, Component }) => (
      <Component key={id} {...rest} />
    ))}
  </View>
);
