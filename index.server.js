// @flow
import render from "./src/runtime/server/ssr";
import {
  graphqlEndpoint as graphql,
  graphiqlEndpoint as graphiql,
} from "./src/runtime/server/graphql";

import RockNative from "./src";

export const ssr = render(RockNative);
export { graphql, graphiql };
