import createNetworkInterface from "../networkInterface";

jest.mock("react-native-device-info", () => ({
  getBundleId: () => "com.wow",
  getVersion: () => "1.2.3",
}));

it("should have the uri included", () => {
  const networkInterface = createNetworkInterface();
  expect(networkInterface._uri).toEqual("http://localhost:3000/graphql");
});

it("should have have a batchInterval of 10 ms", () => {
  const networkInterface = createNetworkInterface();
  expect(networkInterface.batcher.batchInterval).toEqual(10);
});

describe("middleware", () => {
  it("has batchMiddleware", () => {
    const networkInterface = createNetworkInterface();
    expect(networkInterface._middlewares[0].applyBatchMiddleware).toBeDefined();
  });

  it("adds headers to request", () => {
    const networkInterface = createNetworkInterface();
    const middleware = networkInterface._middlewares[0].applyBatchMiddleware;
    const options = {};
    middleware({ options }, jest.fn());
    expect(options).toEqual({
      headers: { clientId: "com.wow_ios", version: "1.2.3" },
    });
  });
  it("modifies existing headers", () => {
    const networkInterface = createNetworkInterface();
    const middleware = networkInterface._middlewares[0].applyBatchMiddleware;
    const options = { headers: { foo: "bar" } };
    middleware({ options }, jest.fn());
    expect(options).toEqual({
      headers: { clientId: "com.wow_ios", version: "1.2.3", foo: "bar" },
    });
  });
});
