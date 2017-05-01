//@flow
import { createBatchingNetworkInterface } from "react-apollo";

export default () =>
  createBatchingNetworkInterface({
    uri: "/graphql",
    batchInterval: 10,
  });
