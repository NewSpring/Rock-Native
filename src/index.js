// @flow
import React from "react";
import { Text, View, Platform, Button } from "react-native";
import { withState, withHandlers, compose } from "recompose";

type IWithState = {
  counter: number,
  setCounter: Function
};

export const state = withState(
  "counter",
  "setCounter",
  ({ defaultValue }) => defaultValue || 1
);

type IWithHandlers =
  & {
    increment: Function,
    decrement: Function
  }
  & IWithState;

export const actions = withHandlers({
  increment: ({ setCounter }) => () => setCounter(n => n + 1),
  decrement: ({ setCounter }) => () => setCounter(n => n - 1)
});

export const Counter = (
  {
    increment,
    counter,
    decrement
  }: IWithHandlers
) => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Text>Counter is at {counter} on {Platform.OS}</Text>
    <Button title="Increment" onPress={increment} />
    <Button title="Decrement" onPress={decrement} />
  </View>
);

export default compose(state, actions)(Counter);
