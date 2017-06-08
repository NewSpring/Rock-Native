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
  layout: String!
  blocks: [Block]
}

type Block {
  id: Int!
  path: String!
  zone: String!,
  order: Int!,
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

type IBlock = {
  id: number,
  path: string,
  order: number,
  zone: string,
};

type IPage = {
  id: number,
  layout: string,
  blocks: IBlock[],
};

export const resolvers = {
  Query: {
    sample: (): ISample => ({ code: 200, message: "hello world" }),
    getRouteInfo: () => {
      return {
        id: 1,
        layout: "Horizontal",
        blocks: [
          { path: "HelloWorld", id: 3, zone: "main", order: 1 },
          { path: "HelloWorld", id: 2, zone: "secondary", order: 1 },
          { path: "Counter", id: 1, zone: "secondary", order: 0 },
        ],
      };
    },
  },
  Response: {
    code: ({ code }: ISample): number => code,
    message: ({ message }: ISample): string => message,
  },
  Page: {
    id: ({ id }: IPage) => id,
    layout: ({ layout }: IPage) => layout,
    blocks: ({ blocks }: IPage) => blocks,
  },
  Block: {
    id: ({ id }: IBlock) => id,
    zone: ({ zone }: IBlock) => zone,
    order: ({ order }: IBlock) => order,
    path: ({ path }: IBlock) => path,
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
