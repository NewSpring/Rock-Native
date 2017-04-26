// @flow

import type { ILambdaContext } from "./withApp";

type IReactRouterContext = {
  url: string,
};

export default (
  { ctx, context }: { ctx: ILambdaContext, context: IReactRouterContext },
): void => {
  const err = new Error(
    "HandlerDemo.ResponseFound Redirection: Resource found elsewhere",
  );
  err.name = context.url;
  ctx.done(err, {});
};
