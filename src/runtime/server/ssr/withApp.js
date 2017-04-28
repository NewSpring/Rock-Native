// @flow

import type { Component } from "react";

type StaticRouterContext = {
  url?: string,
};

export type IResponseData = {
  statusCode: number,
  headers: { [header: string]: string },
  body: string,
};

export type ILambdaContext = {
  done: (err: Error, payload: any) => void,
  succeed: IResponseData => void,
};

export type ILambdaEvent = {
  path: string,
  requestContext: {
    stage: string,
  },
};

export type IConfig = {
  manifests?: ?{ [key: string]: string },
};

export default (App: Component, config: IConfig) => (
  event: ILambdaEvent,
  ctx: ILambdaContext,
): {
  path: string,
  ctx: ILambdaContext,
  context: StaticRouterContext,
  App: Component,
  config: IConfig,
} => ({
  path: event.path,
  ctx,
  context: {},
  App,
  config,
});
