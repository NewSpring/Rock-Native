// @flow
import render from "./src/runtime/server/ssr";
import {
  graphqlEndpoint as graphql,
  graphiqlEndpoint as graphiql,
} from "./src/runtime/server/graphql";

// load the app
import RockNative from "./src";

// load the manifests
// $FlowIgnore
import client from "./web/dist/manifests/client.json";
// $FlowIgnore
import vendor from "./web/dist/manifests/vendor.json";

export const ssr = render(RockNative, { manifests: { client, vendor } });
export { graphql, graphiql };
