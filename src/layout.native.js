// @flow

import { View } from "react-native";
import { layoutStyle } from "./";
import type { IBlockDescription } from "./runtime/registry/index.browser.js";

export type ILayoutProps = {
  components: IBlockDescription[],
};

export default ({ components }: ILayoutProps) => (
  <View style={layoutStyle.resolve()}>
    {components.map(({ ...rest, id, Component }) => (
      <Component key={id} {...rest} />
    ))}
  </View>
);
