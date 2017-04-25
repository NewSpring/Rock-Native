// @flow
import { withState, withHandlers } from "recompose";
import Style from "@jongold/further";

import Junction from "./junction";
import Counter from "./counter";

type IWithState = {
  counter: number,
  setCounter: Function,
};

export const state = withState(
  "counter", // state name
  "setCounter", // updater name
  ({ defaultValue }) => defaultValue || 0, // default
);

export type IWithHandlers =
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

export default Junction().with(state).with(actions).render(Counter);
