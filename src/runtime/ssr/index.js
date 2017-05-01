// import "babel-polyfill";
import { compose } from "ramda";
import { ifElse } from "fugazi";

import endRequest from "./endRequest";
import redirect from "./redirect";
import renderBody from "./renderBody";
import withApp from "./withApp";
import withHtml from "./html";
import withMeta from "./withMeta";

// async ifElse
export const shouldRedirect = ifElse(
  state => state.then(({ context }) => context.url),
  state => state.then(redirect),
  state => state.then(compose(endRequest, withHtml, withMeta)),
);

export default (App, config) =>
  compose(shouldRedirect, renderBody, withApp(App, config));
