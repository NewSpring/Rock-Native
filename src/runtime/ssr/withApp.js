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
  headers: {
    [key: string]: string,
    authorization?: string,
  },
  requestContext: {
    stage: string,
    identity?: {
      sourceIp: string,
    },
  },
};

export type IConfig = {
  manifests?: ?{ [key: string]: string },
};

export default (App: Component, config: IConfig) => (
  event: ILambdaEvent,
  ctx: ILambdaContext,
): {
  event: ILambdaEvent,
  ctx: ILambdaContext,
  context: StaticRouterContext,
  App: Component,
  config: IConfig,
} => ({
  event,
  ctx,
  context: {},
  App,
  config,
});
