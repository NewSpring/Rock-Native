// @flow
import { defaultProps } from "recompose";

import Style from "@jongold/further";
import Junction from "./junction";
import loadBlocks from "./runtime/registry";
import Layout from "./layout";

const registry = {
  blocks: [{ path: "HelloWorld", id: 2 }, { path: "Counter", id: 1 }],
};

export const layoutStyle = Style.of({
  flex: 1,
});

// XXX will be replaced with graphql query
const props = defaultProps({ registry });

export default Junction()
  // XXX load data from graphql
  // .with(loadRouteData)
  // XXX remove the default value on the next line
  .with(props)
  .with(loadBlocks)
  // XXX load layout file
  // XXX place blocks in layout
  .render(Layout);
