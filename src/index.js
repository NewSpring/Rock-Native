// @flow
import { defaultProps } from "recompose";

import Junction from "./junction";
import loadBlocks from "./runtime/registry";
import Layout from "./layout";

const registry = {
  blocks: [{ path: "Counter", id: 1 }, { path: "HelloWorld", id: 2 }],
};

// XXX will be replaced with graphql query
const props = defaultProps({ registry });
console.log(props);

export default Junction()
  // XXX load data from graphql
  // .with(loadRouteData)
  // XXX remove the default value on the next line
  .with(props)
  .with(loadBlocks)
  // XXX load layout file
  // XXX place blocks in layout
  .render(Layout);
