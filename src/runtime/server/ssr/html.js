export const html = (metadata, body) =>
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
      <div id="rock-native">
        ${body}
      </div>
      <script src="https://s3.amazonaws.com/ns-ops/serverless/vendor.js"></script>
      <script src="https://s3.amazonaws.com/ns-ops/serverless/main-client.js"></script>
    </body>
  </html>
`;

export default ({ body, metadata, ...rest }) => ({
  ...rest,
  html: html(metadata, body),
});
