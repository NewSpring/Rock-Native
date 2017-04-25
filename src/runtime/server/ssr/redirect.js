export default ({ ctx, context }) => {
  const err = new Error(
    "HandlerDemo.ResponseFound Redirection: Resource found elsewhere",
  );
  err.name = context.url;
  ctx.done(err, {});
};
