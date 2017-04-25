import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import Helmet from "react-helmet";
import { makeExecutableSchema } from "graphql-tools";

// XXX why can't I import this?
import { graphqlLambda, graphiqlLambda } from "graphql-server-lambda";

import RockNative from "./src";

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

export const graphql = (event, ctx, cb) => {
  // enable cors
  const filter = (error, output) => {
    output.headers["Access-Control-Allow-Origin"] = "*";
    cb(error, output);
  };
  return graphqlLambda({ schema })(event, ctx, filter);
};

export const graphiql = (event, ctx, cb) => {
  const stage = event.isOffline ? "" : `/${event.requestContext.stage}`;
  return graphiqlLambda({ endpointURL: `${stage}/graphql` })(event, ctx, cb);
};

export const ssr = (event, ctx) => {
  const path = event.path;

  const context = {};

  // prerender the app
  const body = renderToString(
    <StaticRouter location={path} context={context}>
      <RockNative />
    </StaticRouter>,
  );

  if (context.url) {
    const err = new Error(
      "HandlerDemo.ResponseFound Redirection: Resource found elsewhere",
    );
    err.name = context.url;
    context.done(err, {});
    return;
  }

  const metadata = Helmet.renderStatic();

  const html = `
      <!doctype html>
      <html ${metadata.htmlAttributes.toString()}>
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          ${metadata.title.toString()}
          ${metadata.meta.toString()}
          ${metadata.link.toString()}
        </head>
        <body ${metadata.bodyAttributes.toString()}>
          <div id="rock-native">
            ${body}
          </div>
          <script src="https://s3.amazonaws.com/ns-ops/serverless/vendor.js"></script>
          <script src="https://s3.amazonaws.com/ns-ops/serverless/main-client.js"></script>
        </body>
      </html>
  `;

  ctx.succeed({
    statusCode: 200,
    headers: {
      "Content-Type": "text/html",
      "Access-Control-Allow-Origin": "*",
    },
    body: html,
  });
};
