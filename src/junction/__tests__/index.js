// @flow
import { Text, View, Platform, Button } from "react-native";
import { withState, withHandlers } from "recompose";
import React from "react";
import renderer from "react-test-renderer";

import Junction from "~/junction";

const state = withState(
  "counter",
  "setCounter",
  ({ defaultValue }) => defaultValue || 0,
);

const actions = withHandlers({
  increment: ({ setCounter }) => () => setCounter(n => n + 1),
  decrement: ({ setCounter }) => () => setCounter(n => n - 1),
});

const Counter = (
  {
    increment,
    counter,
    decrement,
  }: { increment: Function, counter: number, decrement: Function },
) => (
  <View>
    <Text>Counter is at {counter} on {Platform.OS}</Text>
    <Button onPress={increment} title="Increment" />
    <Button onPress={decrement} title="Decrement" />
  </View>
);

const Item = Junction().with(state).with(actions).render(Counter);

describe("constructor", () => {
  it("should return an instance of Junction", () => {
    const junc = Junction();
    expect(junc instanceof Junction);
  });
});

describe("render", () => {
  const A = Junction().render(() => <Text>Hello World</Text>);
  const tree = renderer.create(<A />);
  expect(tree).toMatchSnapshot();
});

describe("map", () => {
  const A = Junction().map(hoc => B => hoc(() => <View><B /> </View>));

  const Comp = () => <Text>Hai World</Text>;

  const B = A.render(Comp);
  const C = A.render(() => null);

  it("renders a wrapped component", () => {
    const tree1 = renderer.create(<B />);
    expect(tree1).toMatchSnapshot();
  });
  it("renders null if passed", () => {
    const tree2 = renderer.create(<C />);
    expect(tree2).toMatchSnapshot();
  });
});

describe("with", () => {
  it("successfully wraps a component", () => {
    const A = Junction()
      .with(state)
      .with(actions)
      .render(({ foo, counter, increment }) => (
        <Text>{counter} - {foo} - {typeof increment}</Text>
      ));

    const tree = renderer.create(<A foo="bar" />);
    expect(tree).toMatchSnapshot();
  });
});

describe("Counter", () => {
  it("full integration counter", () => {
    // XXX test actual actions (i.e. click)
    const tree = renderer.create(<Item />);
    expect(tree).toMatchSnapshot();
  });
});
