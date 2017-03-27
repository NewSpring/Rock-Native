// @flow
import React from "react";
import { Text, View, Platform, Button, StyleSheet } from "react-native";
import { withState, withHandlers } from "recompose";

import Junction from "~/junction";

type IWithState = {
  counter: number,
  setCounter: Function,
};

export const state = withState(
  "counter",
  "setCounter",
  ({ defaultValue }) => defaultValue || 0,
);

type IWithHandlers =
  & {
    increment: Function,
    decrement: Function,
  }
  & IWithState;

export const actions = withHandlers({
  increment: ({ setCounter }) => () => setCounter(n => n + 1),
  decrement: ({ setCounter }) => () => setCounter(n => n - 1),
});

export const Counter = (
  {
    increment,
    counter,
    decrement,
  }: { increment: Function, counter: number, decrement: Function },
) => (
  <View style={style.counter}>
    <Text>Counter is at {counter} on {Platform.OS}</Text>
    <Button onPress={increment} title="Increment" />
    <Button onPress={decrement} title="Decrement" />
  </View>
);

const style = StyleSheet.create({
  counter: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Junction().with(state).with(actions).render(Counter);
