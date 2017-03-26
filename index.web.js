/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React from "react";
import { AppRegistry } from "react-native";
import { AppContainer, ModuleHotAcceptDependency } from "react-hot-loader";
import RockNative from "./src";

const render = Component => {
  const App = () => (
    <AppContainer>
      <Component />
    </AppContainer>
  );
  AppRegistry.registerComponent("RockNative", () => App);
  AppRegistry.runApplication("RockNative", {
    initialProps: {},
    rootTag: document.getElementById("react-app")
  });
};

render(RockNative);

// Hot Module Replacement API
if (ModuleHotAcceptDependency.hot) {
  ModuleHotAcceptDependency.hot.accept("./src", () => {
    const newRockNative = require("./src").default;
    render(newRockNative);
  });
}
