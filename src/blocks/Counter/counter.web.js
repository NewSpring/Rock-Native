//@flow
import Meta from "react-helmet";

import type { ICounter } from "./";
import { counterStyle } from "./";

export const Counter = ({
  increment,
  counter,
  decrement,
  loading,
  sample,
}: ICounter) => (
  <div style={counterStyle.resolve()}>
    <Meta>
      <title>Awesome counter app</title>
    </Meta>
    {loading && <h4>loading...</h4>}
    {sample &&
      <h4>
        GraphQL returned {sample.message} with a response of {sample.code}
      </h4>}
    <span>Counter is at {counter} on web</span>
    <br />
    <button onClick={increment}>Increment</button>
    <button onClick={decrement}>Decrement</button>
  </div>
);

export default Counter;
