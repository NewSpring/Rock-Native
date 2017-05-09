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

type Page {
  id: Int!
  blocks: [Block]
}

type Block {
  id: Int!
  path: String!
}

# the schema allows the following query:
type Query {
  sample: Response
  getRouteInfo(path: String!): Page
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
    getRouteInfo: (_, { path }) => {
      const sampleRegistry = {
        id: 1,
        blocks: [{ path: "HelloWorld", id: 2 }, { path: "Counter", id: 1 }],
      };
      if (path === "/") return sampleRegistry;
      return {
        ...sampleRegistry,
        blocks: sampleRegistry.blocks.reverse(),
      };
    },
  },
  Response: {
    code: ({ code }: ISample): number => code,
    message: ({ message }: ISample): string => message,
  },
  Page: {
    id: ({ id }) => id,
    blocks: ({ blocks }) => blocks,
  },
  Block: {
    id: ({ id }) => id,
    path: ({ path }) => path,
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
