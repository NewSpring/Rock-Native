//@flow
import { createBatchingNetworkInterface } from "react-apollo";
import { platform, bundleId, version } from "./util";

/*
  NOTE: Since Android is run in an emulator instead of a simulator, localhost
  is the address of the emulated device, not the dev machine. We have to use 10.0.2.2
  for the dev machine.
*/
const isAndroid = platform() === "android";

export default () =>
  createBatchingNetworkInterface({
    uri: `http://${isAndroid ? "10.0.2.2" : "localhost"}:3000/graphql`,
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
