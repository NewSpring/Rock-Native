import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";

export default ({ path, context, ctx, App }) => ({
  context,
  ctx,
  body: renderToString(
    <StaticRouter location={path} context={context}>
      <App />
    </StaticRouter>,
  ),
});
