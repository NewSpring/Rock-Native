// @flow
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";

import RockNative from "./src";

// offline support
if (process.env.NODE_ENV === "production") {
  require("offline-plugin/runtime").install();
}

const start = Component => {
  render(
    <BrowserRouter>
      <Component />
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
