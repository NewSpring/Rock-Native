// @flow
import { Text, View } from "react-native";
import { helloStyle } from "./";
import PushRequestButton from "../PushNotifications/";

export const HelloWorld = () => (
  <View>
    <Text style={helloStyle.resolve()}>Hello World</Text>
    <PushRequestButton />
  </View>
);
HelloWorld.displayName = "HelloWorld";

export default HelloWorld;
