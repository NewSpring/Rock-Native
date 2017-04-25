//@flow
import Meta from "react-helmet";

import type { IWithHandlers } from "./";
import { counterStyle } from "./";

export const Counter = (
  {
    increment,
    counter,
    decrement,
  }: IWithHandlers,
) => (
  <div style={counterStyle.resolve()}>
    <Meta>
      <title>Awesome counter app</title>
    </Meta>
    <h6>Counter is at {counter} on web</h6>
    <button onClick={increment}>Increment</button>
    <button onClick={decrement}>Decrement</button>
  </div>
);

export default Counter;
