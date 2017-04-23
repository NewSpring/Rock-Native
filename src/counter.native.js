//@flow
import { Text, View, Platform, Button } from "react-native";

import type { IWithHandlers } from "./";
import { counterStyle } from "./";

export default (
  {
    increment,
    counter,
    decrement,
  }: IWithHandlers,
) => (
  <View style={counterStyle.resolve()}>
    <Text>Counter is at {counter} on {Platform.OS}</Text>
    <Button onPress={increment} title="Increment" />
    <Button onPress={decrement} title="Decrement" />
  </View>
);