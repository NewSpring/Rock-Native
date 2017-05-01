// @flow
// import "babel-polyfill";
import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";

import {
  getDataFromTree,
  ApolloClient,
  ApolloProvider as Provider,
} from "react-apollo";

import createNetworkInterface from "../../data/graphql/networkInterface.server";
// import { createContextFromRequestEvent } from "../graphql";

import type { ILambdaContext, ILambdaEvent, IConfig } from "./withApp";

type StaticRouterContext = {
  url?: string,
};

type IRenderShape = {
  event: ILambdaEvent,
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
  initialState: mixed,
};

export default async ({
  event,
  context,
  ctx,
  App,
  config,
}: IRenderShape): Promise<IRenderResult> => {
  const networkInterface = createNetworkInterface();
  // networkInterface.use([
  //   {
  //     applyMiddleware: (payload: { context: mixed }, next) => {
  //       payload.context = createContextFromRequestEvent(event);
  //       next();
  //     },
  //   },
  // ]);

  // this is where we would add custom middleware for creating context
  const client = new ApolloClient({
    networkInterface,
    ssrMode: true,
  });

  const RockNative = (
    <StaticRouter location={event.path} context={context}>
      <Provider client={client}>
        <App />
      </Provider>
    </StaticRouter>
  );

  // load data from db using graphql connected components
  await getDataFromTree(RockNative);

  return {
    context,
    ctx,
    config,
    body: renderToString(RockNative),
    initialState: { apollo: client.getInitialState() },
  };
};
