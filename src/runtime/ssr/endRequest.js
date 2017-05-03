// @flow

import type { ILambdaContext } from "./withApp";

export default ({ ctx, html }: { ctx: ILambdaContext, html: string }): void =>
  ctx.succeed({
    statusCode: 200,
    headers: {
      "Content-Type": "text/html",
      "Access-Control-Allow-Origin": "*",
    },
    body: html,
  });
