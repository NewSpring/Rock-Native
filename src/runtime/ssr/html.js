import { values } from "ramda";
import type { Head } from "react-helmet";

import type { IConfig } from "./withApp";

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
): string =>
  `
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
      ${scripts}
    </body>
  </html>
`;

export default ({
  body,
  metadata,
  config,
  ...rest
}: {
  config: IConfig,
  body: string,
  metadata: Head,
  rest: {},
}) => ({
  ...rest,
  html: html(metadata, body, createScripts(config)),
});
