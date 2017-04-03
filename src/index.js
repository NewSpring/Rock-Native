// @flow
import React from "react";
import { Text, View, Platform, Button } from "react-native";
import { withState, withHandlers } from "recompose";
import Style from "@jongold/further";

import Junction from "./junction";

type IWithState = {
  counter: number,
  setCounter: Function,
};

export const state = withState(
  "counter", // state name
  "setCounter", // updater name
  ({ defaultValue }) => defaultValue || 0, // default
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

export const counterStyle = Style.of({
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
});

export const Counter = (
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

export default Junction().with(state).with(actions).render(Counter);
