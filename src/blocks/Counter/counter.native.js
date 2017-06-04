//@flow
import { Text, View, Platform, Button } from "react-native";

import type { ICounter } from "./";
import { counterStyle } from "./";

export const Counter = ({
  increment,
  counter,
  decrement,
  loading,
  sample,
}: ICounter) => (
  <View testID="counterView" style={counterStyle.resolve()}>
    {loading && <Text>loading...</Text>}
    {sample &&
      <Text>
        GraphQL returned {sample.message} with a response of {sample.code}
      </Text>}
    <Text testID="counterOutput">Counter is at {counter} on {Platform.OS}</Text>
    <Button testID="increment" onPress={increment} title="Increment" />
    <Button testID="decrement" onPress={decrement} title="Decrement" />
  </View>
);
Counter.displayName = "Counter";

export default Counter;
