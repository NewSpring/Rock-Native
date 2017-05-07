// @flow

import Style from "@jongold/further";
import Junction from "./junction";
import loadBlocks from "./runtime/registry";
import Layout from "./layout";
import loadRouteData from "./runtime/route-info";

export const layoutStyle = Style.of({
  flex: 1,
});

export default Junction()
  // XXX load data from graphql
  .with(loadRouteData)
  .with(loadBlocks)
  // XXX load layout file
  // XXX place blocks in layout
  .render(Layout);
