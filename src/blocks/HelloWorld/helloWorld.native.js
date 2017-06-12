// @flow
import { Text } from "react-native";
import { helloStyle } from "./";

export const HelloWorld = () => (
  <Text testId="helloWorld" style={helloStyle.resolve()}>Hello World</Text>
);
HelloWorld.displayName = "HelloWorld";

export default HelloWorld;
