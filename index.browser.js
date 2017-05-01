// @flow
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { ApolloClient, ApolloProvider as Provider } from "react-apollo";

import createNetworkInterface from "./src/data/graphql/networkInterface";
import RockNative from "./src";

// offline support
if (process.env.NODE_ENV === "production") {
  require("offline-plugin/runtime").install();
}

const start = Component => {
  const client = new ApolloClient({
    networkInterface: createNetworkInterface(),
    connectToDevTools: process.env.NODE_ENV === "production",
    initialState: window.__APOLLO_STATE__ || {},
  });
  render(
    <BrowserRouter>
      <Provider client={client}>
        <Component />
      </Provider>
    </BrowserRouter>,
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
