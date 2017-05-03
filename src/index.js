// @flow
import { withState, withHandlers } from "recompose";
import Style from "@jongold/further";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

import Junction from "./junction";
import Counter from "./counter";

type IWithSampleData = {
  loading: boolean,
  sample?: {
    code: number,
    message: string,
  },
};

export const SAMPLE_QUERY = gql`{ sample { code message } }`;
export const sampleDataPropsReducer = ({
  data,
}: {
  data: IWithSampleData,
}): IWithSampleData => ({ ...data });
// XXX lets make awesome flow typings for this
export const withSampleData = graphql(SAMPLE_QUERY, {
  props: sampleDataPropsReducer,
});

type IWithState = {
  counter: number,
  setCounter: Function,
};

export const state = withState(
  "counter", // state name
  "setCounter", // updater name
  ({ defaultValue }) => defaultValue || 0, // default
);

export type IWithHandlers = {
  increment: Function,
  decrement: Function,
} & IWithState;

export const actions = withHandlers({
  increment: ({ setCounter }) => () => setCounter(n => n + 1),
  decrement: ({ setCounter }) => () => setCounter(n => n - 1),
});

export const counterStyle = Style.of({
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
});

export type ICounter = IWithSampleData & IWithHandlers;

// XXX also how can we make flow typing this killer?
// ideally each HOC would pass its prop types which would combine
export default Junction()
  .with(withSampleData)
  .with(state)
  .with(actions)
  .render(Counter);
