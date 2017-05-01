import { compose, ifElse } from "ramda";

import endRequest from "./endRequest";
import redirect from "./redirect";
import renderBody from "./renderBody";
import withApp from "./withApp";
import withHtml from "./html";
import withMeta from "./withMeta";

export const shouldRedirect = ifElse(
  ({ context }) => context.url,
  redirect,
  compose(endRequest, withHtml, withMeta),
);

export default (App, config) =>
  compose(shouldRedirect, renderBody, withApp(App, config));
