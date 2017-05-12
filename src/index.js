// @flow
import Style from "@jongold/further";
import {
  compose,
  curry,
  groupBy,
  adjust,
  reverse,
  sort,
  subtract,
  map,
  fromPairs,
  toPairs,
  lensProp,
  defaultTo,
  view,
} from "ramda";
import { branch, mapProps } from "recompose";
import { withRouter } from "react-router";

import Junction from "./junction";

import loadComponents from "./runtime/registry";
import loadRouteData from "./runtime/route-info";

import type { IBlockDescription, IState } from "./runtime/registry/util/types";

export const layoutStyle = Style.of({ flex: 1 });

export const Loading = () => null;
export const loadingCheck = compose(
  defaultTo(false),
  view(lensProp("loading"))
);
export const loadingState = branch(loadingCheck, () => Loading);

export const groupObject = curry((fn, keys) => groupBy(fn, keys));
export const zoneFromBlock = view(lensProp("zone"));
export const mapValues = curry((fn, obj) =>
  fromPairs(map(adjust(fn, 1), toPairs(obj)))
);
export const order = mapValues(compose(reverse, sort(subtract)));

export const blocksToZones = mapProps((props: IState) => ({
  Layout: props.Layout,
  zones: order(groupObject(zoneFromBlock, props.components)),
}));

export default Junction()
  .with(withRouter)
  .with(loadRouteData)
  .with(loadingState)
  .with(loadComponents)
  .with(blocksToZones)
  .render(({ Layout, zones }: ILayoutProps) => <Layout zones={zones} />);
