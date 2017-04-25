import Helmet from "react-helmet";

export default x => ({
  ...x,
  metadata: Helmet.renderStatic(),
});
