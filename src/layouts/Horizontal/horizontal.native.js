// @flow

import { View, Text } from "react-native";
import { layoutStyle } from "./";
import type { ILayoutProps } from "./";

export default ({ components }: ILayoutProps) => (
  <View>
    <View>
      <Text style={{ color: "#6BAC43", position: "relative", top: "100%" }}>
        Native Horizontal Layout
      </Text>
    </View>
    <View style={layoutStyle.resolve()}>
      {components
        .sort((a, b) => {
          return b.order - a.order;
        })
        .map(({ ...rest, id, Component }) => <Component key={id} {...rest} />)}
    </View>
  </View>
);
