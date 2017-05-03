// @flow
import { graphql as graphqljs } from "graphql";
import { makeExecutableSchema } from "graphql-tools";
import { print } from "graphql/language/printer";
import type { ExecutionResult, DocumentNode } from "graphql";

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

export const safeQuery = (query: string | DocumentNode): string =>
  typeof query === "string" ? query : print(query);
// this is a curried schema execution function
// use it to execute queries for SSR and testing
export const graphql = (
  query: string | DocumentNode,
  root?: mixed,
  context?: mixed,
  variables?: ?{ [key: string]: mixed },
  operationName?: ?string,
): Promise<ExecutionResult> =>
  graphqljs(schema, safeQuery(query), root, context, variables, operationName);
