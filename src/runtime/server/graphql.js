// @flow
import { graphql as graphqljs } from "graphql";
import { makeExecutableSchema } from "graphql-tools";
import { graphqlLambda, graphiqlLambda } from "graphql-server-lambda";

import type { ExecutionResult } from "graphql";
// XXX move these to a typings file for lambda
import type { ILambdaEvent, ILambdaContext } from "./ssr/withApp";

export const typeDefs = `
type Response {
  code: Int!
  message: String
}

# the schema allows the following query:
type Query {
  sample: Response
}

schema {
  query: Query
}
`;

type ISample = {
  code: number,
  message: string,
};

export const resolvers = {
  Query: {
    sample: (): ISample => ({ code: 200, message: "hello world" }),
  },
  Response: {
    code: ({ code }: ISample): number => code,
    message: ({ message }: ISample): string => message,
  },
};

export const schema = makeExecutableSchema({ typeDefs, resolvers });

// this is a curried schema execution function
// use it to execute queries for SSR and testing
export const graphql = (
  query: string,
  root?: mixed,
  context?: mixed,
  variables?: ?{ [key: string]: mixed },
  operationName?: ?string,
): Promise<ExecutionResult> =>
  graphqljs(schema, query, root, context, variables, operationName);

export type ILambdaOutput = {
  headers: { [key: string]: string },
};
export type ILambdaCallback = (error: mixed, output: ILambdaOutput) => void;

// enable cors
export const withCors = (cb: ILambdaCallback): ILambdaCallback =>
  (error, output) => {
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
