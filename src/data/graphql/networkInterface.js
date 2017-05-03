//@flow
import { createBatchingNetworkInterface } from "react-apollo";

export default () =>
  createBatchingNetworkInterface({
    uri: "http://localhost:3000/graphql",
    batchInterval: 10,
  });
