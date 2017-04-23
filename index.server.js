import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import { createServerRenderer } from "aspnet-prerendering";
import Helmet from "react-helmet";

import RockNative from "./src";

export default createServerRenderer(params => {
  return new Promise((resolve, reject) => {
    const context = {};
    
    // prerender the app
    const html = renderToString(
      <StaticRouter location={params.location} context={context}>
        <RockNative {...params.data} />
      </StaticRouter>
    );

    const metadata = Helmet.renderStatic();
    const meta = `
      ${metadata.title.toString()}
      ${metadata.meta.toString()}
      ${metadata.link.toString()}
    `;

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
            meta,
            bodyAttributes: metadata.bodyAttributes.toString(),
            htmlAttributes: metadata.htmlAttributes.toString(),
          },
        });
      },
      reject,
    ); // Also propagate any errors back into the host application
  });
});
