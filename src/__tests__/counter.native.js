/*//@flow
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
  <View style={counterStyle.resolve()}>
    {loading && <Text>loading...</Text>}
    {sample &&
      <Text>
        GraphQL returned {sample.message} with a repsponse of {sample.code}
      </Text>}
    <Text>Counter is at {counter} on {Platform.OS}</Text>
    <Button onPress={increment} title="Increment" />
    <Button onPress={decrement} title="Decrement" />
  </View>
);

export default Counter;*/
