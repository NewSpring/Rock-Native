// @flow

import { View, Text } from "react-native";
import { layoutStyle } from "./";
import type {
  IBlockDescription,
} from "../../runtime/registry/index.browser.js";

export type ILayoutProps = {
  components: IBlockDescription[],
};

export default ({ components }: ILayoutProps) => (
  <View>
    <View>
      <Text style={{ color: "#6BAC43", position: "relative", top: "100%" }}>
        Native Vertical Layout
      </Text>
    </View>
    <View style={layoutStyle.resolve()}>
      {components.map(({ ...rest, id, Component }) => (
        <Component key={id} {...rest} />
      ))}
    </View>
  </View>
);
