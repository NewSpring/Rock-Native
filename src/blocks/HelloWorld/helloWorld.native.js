// @flow
import { Text } from "react-native";
import { helloStyle } from "./";

export default () => <Text style={helloStyle.resolve()}>Hello World</Text>;
