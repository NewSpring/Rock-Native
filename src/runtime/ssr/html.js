import { values } from "ramda";
import type { Head } from "react-helmet";

import type { IConfig } from "./withApp";
import type { IRenderResult } from "./renderBody";

export const createScripts = (
  { manifests: { client, vendor } }: IConfig = { manifests: {} },
): string =>
  values(vendor)
    .concat(values(client))
    .map(src => `<script src="${src}"></script>`)
    .join("");

export const html = (
  metadata: Head,
  body: string,
  scripts: string = "",
  initialState: mixed = {},
): string => `
  <!doctype html>
  <html ${metadata.htmlAttributes.toString()}>
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      ${metadata.title.toString()}
      ${metadata.meta.toString()}
      ${metadata.link.toString()}
    </head>
    <body ${metadata.bodyAttributes.toString()}>
      <div id="rock-native">${body}</div>
      <script>window.__APOLLO_STATE__=${JSON.stringify(initialState)}</script>
      ${scripts}
    </body>
  </html>
`;

export default ({
  body,
  initialState,
  metadata,
  config,
  ...rest
}): IRenderResult => ({
  ...rest,
  html: html(metadata, body, createScripts(config), initialState),
});
