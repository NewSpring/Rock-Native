import { makeExecutableSchema } from "graphql-tools";
import { graphqlLambda, graphiqlLambda } from "graphql-server-lambda";

const typeDefs = `
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

const resolvers = {
  Query: {
    sample: () => ({ code: 200, message: "hello world" }),
  },
  Response: {
    code: ({ code }) => code,
    message: ({ message }) => message,
  },
};

const schema = makeExecutableSchema({ typeDefs, resolvers });

// enable cors
export const withCors = cb =>
  (error, output) => {
    output.headers["Access-Control-Allow-Origin"] = "*";
    cb(error, output);
  };

export const graphql = (event, ctx, cb) =>
  graphqlLambda({ schema })(event, ctx, withCors(cb));

export const graphiql = (event, ctx, cb) => {
  const stage = event.isOffline ? "" : `/${event.requestContext.stage}`;
  return graphiqlLambda({ endpointURL: `${stage}/graphql` })(event, ctx, cb);
};
