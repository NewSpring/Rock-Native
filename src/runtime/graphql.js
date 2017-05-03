// @flow
import { graphqlLambda, graphiqlLambda } from "graphql-server-lambda";

import { schema } from "../data/graphql";

// XXX move these to a typings file for lambda
import type { ILambdaEvent, ILambdaContext } from "./ssr/withApp";

export type ILambdaOutput = {
  headers: { [key: string]: string },
};

export type ILambdaCallback = (error: mixed, output: ILambdaOutput) => void;

export type IContext = {
  userId?: string,
  ip?: string,
  isDev: boolean,
};

export const createContextFromRequestEvent = (
  event: ILambdaEvent,
): IContext => {
  const { headers, requestContext } = event;
  return {
    userId: headers && headers.authorization,
    ip: requestContext &&
      requestContext.identity &&
      requestContext.identity.sourceIp,
    isDev: requestContext && requestContext.stage === "dev",
  };
};

// enable cors
export const withCors = (cb: ILambdaCallback): ILambdaCallback => (
  error,
  output,
) => {
  output.headers["Access-Control-Allow-Origin"] = "*";
  cb(error, output);
};

export const graphqlEndpoint = (
  event: ILambdaEvent,
  ctx: ILambdaContext,
  cb: ILambdaCallback,
) => graphqlLambda({ schema })(event, ctx, withCors(cb));

export const graphiqlEndpoint = (
  event: ILambdaEvent,
  ctx: ILambdaContext,
  cb: ILambdaCallback,
) => {
  const stage = event.isOffline ? "" : `/${event.requestContext.stage}`;
  return graphiqlLambda({ endpointURL: `${stage}/graphql` })(event, ctx, cb);
};
