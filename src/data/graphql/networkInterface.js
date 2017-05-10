//@flow
import { createBatchingNetworkInterface } from "react-apollo";
import { platform, bundleId, version } from "./util";

export default () =>
  createBatchingNetworkInterface({
    uri: "http://localhost:3000/graphql",
    batchInterval: 10,
  }).use([
    {
      applyBatchMiddleware(req, next) {
        if (!req.options.headers) {
          req.options.headers = {}; // create the header object if needed
        }
        req.options.headers["clientId"] = `${bundleId()}_${platform()}`;
        req.options.headers["version"] = version();
        next();
      },
    },
  ]);
