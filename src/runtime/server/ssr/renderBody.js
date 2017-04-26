// @flow
import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";

import type { ILambdaContext } from "./withApp";

type StaticRouterContext = {
  url?: string,
};

type IRenderShape = {
  path: string,
  context: StaticRouterContext,
  ctx: ILambdaContext,
  App: any, // can't figure out this flow error
};

type IRenderResult = {
  context: StaticRouterContext,
  ctx: ILambdaContext,
  body: string,
};

export default (
  {
    path,
    context,
    ctx,
    App,
  }: IRenderShape,
): IRenderResult => ({
  context,
  ctx,
  body: renderToString(
    <StaticRouter location={path} context={context}>
      <App />
    </StaticRouter>,
  ),
});
