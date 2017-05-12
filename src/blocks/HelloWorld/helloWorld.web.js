// @flow
import { helloStyle } from "./";

export const HelloWorld = () => (
  <h1 style={helloStyle.resolve()}>Hello World</h1>
);

export default HelloWorld;
