import createNetworkInterface from "../networkInterface";

it("should have the uri included", () => {
  const networkInterface = createNetworkInterface();
  expect(networkInterface._uri).toEqual("http://localhost:3000/graphql");
});

it("should have have a batchInterval of 10 ms", () => {
  const networkInterface = createNetworkInterface();
  expect(networkInterface.batcher.batchInterval).toEqual(10);
});
