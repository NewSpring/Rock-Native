// @flow
import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";

import type { ILambdaContext, IConfig } from "./withApp";

type StaticRouterContext = {
  url?: string,
};

type IRenderShape = {
  path: string,
  context: StaticRouterContext,
  ctx: ILambdaContext,
  App: any, // can't figure out this flow error
  config: IConfig,
};

type IRenderResult = {
  context: StaticRouterContext,
  ctx: ILambdaContext,
  body: string,
  config: IConfig,
};

export default (
  {
    path,
    context,
    ctx,
    App,
    config,
  }: IRenderShape,
): IRenderResult => ({
  context,
  ctx,
  config,
  body: renderToString(
    <StaticRouter location={path} context={context}>
      <App />
    </StaticRouter>,
  ),
});
