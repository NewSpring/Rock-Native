export default ({ ctx, html }) =>
  ctx.succeed({
    statusCode: 200,
    headers: {
      "Content-Type": "text/html",
      "Access-Control-Allow-Origin": "*",
    },
    body: html,
  });
