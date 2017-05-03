import gql from "graphql-tag";

import createNetworkInterface, {
  NetworkInterface,
} from "../networkInterface.server";

import { graphql } from "../";

jest.mock("../", () => ({
  graphql: jest.fn(() => Promise.resolve({ data: { foo: null } })),
}));

describe("createNetworkInterface", () => {
  it("returns a created interface", () => {
    const networkInterface = createNetworkInterface();
    expect(networkInterface instanceof NetworkInterface);
  });
  it("passes options to the interface", () => {
    const networkInterface = createNetworkInterface({ foo: "bar" });
    expect(networkInterface._opts).toEqual({ foo: "bar" });
  });
});

describe("networkInterface", () => {
  describe("query", () => {
    it("allows executing a graphql request", async () => {
      const query = gql`{ foo { name } }`;
      const { data } = await NetworkInterface().query({
        query,
      });
      expect(data.foo).toEqual(null);
      expect(graphql).toBeCalledWith(
        query,
        {},
        undefined,
        undefined,
        undefined,
      );
    });
    it("supports variables and operationName", async () => {
      const query = gql`query Foo($id: Int){ foo(id: $id) { name } }`;
      const variables = { id: 1 };
      const operationName = "Foo";
      const { data } = await NetworkInterface().query({
        query,
        variables,
        operationName,
      });
      expect(data.foo).toEqual(null);
      expect(graphql).toBeCalledWith(
        query,
        {},
        undefined,
        variables,
        operationName,
      );
    });
  });

  describe("middleware", () => {
    it("allows adding a single middleware to the call stack", () => {
      const networkInterface = NetworkInterface();
      const middleware = {
        applyMiddleware() {},
      };

      networkInterface.use([middleware]);
      expect(networkInterface._middlewares.length).toEqual(1);
    });
    it("filters bad values out", () => {
      const networkInterface = NetworkInterface();
      const middleware = {
        applyMiddleware() {},
      };

      const badMiddleware = {
        applyWare() {},
      };

      networkInterface.use([middleware, badMiddleware]);
      expect(networkInterface._middlewares.length).toEqual(1);
    });
    it("can be chained", () => {
      const networkInterface = NetworkInterface();
      const middleware = {
        applyMiddleware() {},
      };
      const middleware2 = {
        applyMiddleware() {},
      };

      networkInterface.use([middleware]).use([middleware2]);
      expect(networkInterface._middlewares.length).toEqual(2);
    });
    it("maintains order", () => {
      const networkInterface = NetworkInterface();
      const middleware = {
        applyMiddleware() {},
      };
      const middleware2 = {
        applyMiddleware() {},
        foo: true,
      };

      networkInterface.use([middleware, middleware2]);
      expect(networkInterface._middlewares.length).toEqual(2);
      expect(networkInterface._middlewares[1].foo).toEqual(true);
    });
    it("is executed before a query", async () => {
      const networkInterface = createNetworkInterface();
      const query = gql`{ foo { name } }`;
      const middleware = {
        applyMiddleware: jest.fn(({ request }, next) => {
          next();
        }),
      };

      await networkInterface.use([middleware]).query({ query });

      expect(middleware.applyMiddleware).toBeCalled();
      expect(middleware.applyMiddleware.mock.calls[0][0]).toEqual({
        request: { query },
      });
      expect(typeof middleware.applyMiddleware.mock.calls[0][1]).toEqual(
        "function",
      );
    });
    it("can modify the request", async () => {
      const networkInterface = createNetworkInterface();
      const query = gql`{ foo { name } }`;
      const hiddenQuery = gql`{ bar { name } }`;

      const middleware = {
        applyMiddleware: jest.fn(({ request }, next) => {
          request.query = hiddenQuery;
          next();
        }),
      };

      await networkInterface.use([middleware]).query({ query });

      expect(middleware.applyMiddleware).toBeCalled();
      expect(middleware.applyMiddleware.mock.calls[0][0]).toEqual({
        request: { query: hiddenQuery },
      });
    });
    it("calls in order", async () => {
      const networkInterface = createNetworkInterface();
      const query = gql`{ foo { name } }`;

      const middleware = {
        applyMiddleware: jest.fn(({ request }, next) => {
          expect(request.meta).toBeUndefined();
          request.meta = 1;
          next();
        }),
      };

      const middleware2 = {
        applyMiddleware: jest.fn(({ request }, next) => {
          expect(request.meta).toEqual(1);
          next();
        }),
      };

      await networkInterface.use([middleware, middleware2]).query({ query });

      expect(middleware.applyMiddleware).toBeCalled();
      expect(middleware2.applyMiddleware).toBeCalled();
    });
  });
  describe("afterware", () => {
    it("allows adding a single afterware to the call stack", () => {
      const networkInterface = NetworkInterface();
      const middleware = {
        applyAfterware() {},
      };

      networkInterface.useAfter([middleware]);
      expect(networkInterface._afterwares.length).toEqual(1);
    });
    it("filters bad values out", () => {
      const networkInterface = NetworkInterface();
      const middleware = {
        applyAfterware() {},
      };

      const badMiddleware = {
        applyWare() {},
      };

      networkInterface.useAfter([middleware, badMiddleware]);
      expect(networkInterface._afterwares.length).toEqual(1);
    });
    it("can be chained", () => {
      const networkInterface = NetworkInterface();
      const middleware = {
        applyAfterware() {},
      };
      const middleware2 = {
        applyAfterware() {},
      };

      networkInterface.useAfter([middleware]).useAfter([middleware2]);
      expect(networkInterface._afterwares.length).toEqual(2);
    });
    it("maintains order", () => {
      const networkInterface = NetworkInterface();
      const middleware = {
        applyAfterware() {},
      };
      const middleware2 = {
        applyAfterware() {},
        foo: true,
      };

      networkInterface.useAfter([middleware, middleware2]);
      expect(networkInterface._afterwares.length).toEqual(2);
      expect(networkInterface._afterwares[1].foo).toEqual(true);
    });
    it("is executed after a query", async () => {
      const networkInterface = createNetworkInterface();
      const query = gql`{ foo { name } }`;
      const middleware = {
        applyAfterware: jest.fn(({ response }, next) => {
          next();
        }),
      };

      await networkInterface.useAfter([middleware]).query({ query });

      expect(middleware.applyAfterware).toBeCalled();
      expect(middleware.applyAfterware.mock.calls[0][0]).toEqual({
        response: { data: { foo: null } },
      });
      expect(typeof middleware.applyAfterware.mock.calls[0][1]).toEqual(
        "function",
      );
    });
    it("can modify the result", async () => {
      const networkInterface = createNetworkInterface();
      const query = gql`{ foo { name } }`;
      const hiddenResult = { data: { foo: true } };

      const middleware = {
        applyAfterware: jest.fn((payload, next) => {
          expect(payload.response).toEqual({ data: { foo: null } });
          payload.response = hiddenResult;
          payload.response.foo = "bar";
          next();
        }),
      };

      const { data, foo } = await networkInterface
        .useAfter([middleware])
        .query({ query });

      expect(middleware.applyAfterware).toBeCalled();

      expect(foo).toEqual("bar");
      expect(data).toEqual({ foo: true });
    });
    it("calls in order", async () => {
      const networkInterface = createNetworkInterface();
      const query = gql`{ foo { name } }`;

      const middleware = {
        applyAfterware: jest.fn((payload, next) => {
          expect(payload.response.meta).toBeUndefined();
          payload.response.meta = 1;
          next();
        }),
      };

      const middleware2 = {
        applyAfterware: jest.fn((payload, next) => {
          payload.response.meta = payload.response.meta + 1;
          expect(payload.response.meta).toEqual(2);
          next();
        }),
      };

      const { data, meta } = await networkInterface
        .useAfter([middleware, middleware2])
        .query({ query });

      expect(middleware.applyAfterware).toBeCalled();
      expect(middleware2.applyAfterware).toBeCalled();
      expect(data).toEqual({ foo: null });
      expect(meta).toEqual(2);
    });
  });
});
