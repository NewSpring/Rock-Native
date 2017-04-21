// @flow
import React from "react";
import { AppRegistry } from "react-native";
import { BrowserRouter } from "react-router-dom";
import RockNative from "./src";

const render = Component => {
  const App = () => (
    <BrowserRouter>
      <Component />
    </BrowserRouter>
  );
  AppRegistry.registerComponent("RockNative", () => App);
  AppRegistry.runApplication("RockNative", {
    initialProps: {},
    rootTag: document.getElementById("react-app"),
  });
};

render(RockNative);

// Hot Module Replacement API
if (module.hot) {
  // $FlowIgnore
  module.hot.accept("./src", () => {
    const newRockNative = require("./src").default;
    render(newRockNative);
  });
}
