// @flow

import Style from "@jongold/further";
// import { ifElse } from "ramda";
import { branch } from "recompose";
import { withRouter } from "react-router";
import Junction from "./junction";

import loadComponents from "./runtime/registry";
import loadRouteData from "./runtime/route-info";

export const layoutStyle = Style.of({
  flex: 1,
});

export const loadingCheck = (
  { loading }: { loading: boolean } = { loading: false }
) => loading;
export const Loading = () => null;
export const loadingState = branch(loadingCheck, () => Loading);

export default Junction()
  .with(withRouter)
  .with(loadRouteData)
  .with(loadingState)
  .with(loadComponents)
  .render(({ Layout, components }) => <Layout components={components} />);
