import type { Head } from "react-helmet";

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

export default (
  {
    scripts,
    body,
    metadata,
    ...rest
  }: {
    scripts: string,
    body: string,
    metadata: Head,
    rest: {},
  },
) => ({
  ...rest,
  html: html(metadata, body, scripts),
});
