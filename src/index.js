// @flow

import Style from "@jongold/further";
// import { ifElse } from "ramda";
import { branch } from "recompose";
import { withRouter } from "react-router";
import Junction from "./junction";
import loadBlocks from "./runtime/registry";
import Layout from "./layout";
import loadRouteData from "./runtime/route-info";

export const layoutStyle = Style.of({
  flex: 1,
});

export const loadingCheck = ({ loading } = { loading: false }) => loading;
export const Loading = () => null;
export const loadingState = branch(loadingCheck, () => Loading);

export default Junction()
  .with(withRouter)
  // .with(mapProps(props => (console.log(props), props)))
  .with(loadRouteData) // load data from graphql
  .with(loadingState)
  .with(loadBlocks)
  // XXX load layout file
  // XXX place blocks in layout
  .render(Layout);
