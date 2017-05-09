// @flow
import { AppRegistry } from "react-native";
import { NativeRouter, Route } from "react-router-native";
import { ApolloClient, ApolloProvider as Provider } from "react-apollo";

import createNetworkInterface from "./src/data/graphql/networkInterface";
import RockNative from "./src";

const client = new ApolloClient({
  networkInterface: createNetworkInterface(),
});

const App = () => (
  <Provider client={client}>
    <NativeRouter>
      <RockNative />
    </NativeRouter>
  </Provider>
);

AppRegistry.registerComponent("RockNative", () => App);
