/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React from "react";
import { AppRegistry } from "react-native";
import { AppContainer } from "react-hot-loader";
import dune from "./src";

const render = Component => {
  const App = () => (
    <AppContainer>
      <Component />
    </AppContainer>
  );
  AppRegistry.registerComponent("dune", () => App);
  AppRegistry.runApplication("dune", {
    initialProps: {},
    rootTag: document.getElementById("react-app"),
  });
};

render(dune);

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept("./src", () => {
    const newDune = require("./src").default;
    render(newDune);
  });
}
