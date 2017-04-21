import React from "react";
import { AppRegistry } from "react-native";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import { createServerRenderer } from "aspnet-prerendering";

import RockNative from "./src";

export default createServerRenderer(params => {
  return new Promise((resolve, reject) => {
    const context = {};
    const AppContainer = () => (
      <StaticRouter location={params.location} context={context}>
        <RockNative {...params.data} />
      </StaticRouter>
    );

    // register the app
    AppRegistry.registerComponent("RockNative", () => AppContainer);

    // prerender the app
    const { element, stylesheet } = AppRegistry.getApplication("RockNative", {
    });
    const html = renderToString(element);

    if (context.url) {
      resolve({ redirectUrl: context.url });
      return;
    }

    // Once the tasks are done, we can perform the final render
    // We also send the redux store state, so the client can continue execution where the server left off
    params.domainTasks.then(
      () => {
        resolve({
          html,
          globals: {
            meta: `<title>Test page</title>${stylesheet}`,
          },
        });
      },
      reject,
    ); // Also propagate any errors back into the host application
  });
});
