// @flow
import { View, Text } from "react-native";

import { render } from "../";
import { layoutStyle } from "./";

import type { ILayoutProps } from "../../runtime/registry/util/types";

export default ({ zones }: ILayoutProps) => (
  <View>
    <View>
      <Text>
        Native Horizontal Layout
      </Text>
    </View>
    <View style={layoutStyle.resolve()}>

      {/* main zone */}
      <View testID="mainZone">
        {zones.main.map(render)}
      </View>

      {/* secondary zone */}
      <View testID="secondaryZone">
        {zones.secondary.map(render)}
      </View>

    </View>
  </View>
);
