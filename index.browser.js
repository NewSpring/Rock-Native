// @flow
import { render } from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import { ApolloClient, ApolloProvider as Provider } from "react-apollo";

import createNetworkInterface from "./src/data/graphql/networkInterface";

import RockNative from "./src";

// offline support
if (process.env.NODE_ENV === "production") {
  require("offline-plugin/runtime").install();
}

const withHeader = {
  applyBatchMiddleware(request, next) {
    if (!request.options.headers) {
      if (fetch.Headers) {
        request.options.headers = new fetch.Headers();
      } else {
        request.options.headers = new Headers();
      }
    }
    next();
  },
};
const identifierMiddleware = {
  applyBatchMiddleware(req, next) {
    // req.headers.platform = "WEB";
    // req.headers.version = "1.2.0"; // ENV variables
    next();
  },
};

const start = Component => {
  const networkInterface = createNetworkInterface().use([
    withHeader,
    identifierMiddleware /*, withUser */,
  ]);

  const client = new ApolloClient({
    networkInterface,
    connectToDevTools: process.env.NODE_ENV !== "production",
    initialState: window.__APOLLO_STATE__ || {},
  });
  render(
    <Provider client={client}>
      <BrowserRouter>
        <Component />
      </BrowserRouter>
    </Provider>,
    document.getElementById("rock-native"),
  );
};

start(RockNative);

// Hot Module Replacement API
if (process.env.NODE_ENV !== "production" && module.hot) {
  // $FlowIgnore
  module.hot.accept("./src", () => {
    const newRockNative = require("./src").default;
    start(newRockNative);
  });
}
