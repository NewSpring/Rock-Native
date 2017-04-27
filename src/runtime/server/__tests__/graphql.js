import { wrap } from "lambda-wrapper";

import {
  typeDefs,
  resolvers,
  withCors,
  graphql,
  graphqlEndpoint,
  graphiqlEndpoint,
} from "../graphql";

describe("typeDefs", () => {
  it("should match a snapshot", () => {
    expect(typeDefs).toMatchSnapshot();
  });
});

describe("resolvers", () => {
  const { Query, Response } = resolvers;

  describe("Query", () => {
    const { sample } = Query;
    it("has an expected shape", () => {
      expect(sample()).toEqual({ code: 200, message: "hello world" });
    });
  });

  describe("Response", () => {
    const data = Query.sample();
    const { code, message } = Response;
    it("has a code method", () => {
      expect(code(data)).toEqual(200);
    });
    it("has a message method", () => {
      expect(message(data)).toEqual("hello world");
    });
  });
});

describe("graphql", () => {
  it("has a sample root level query field", async () => {
    const { data } = await graphql("{ sample { code message } }");
    expect(data).toEqual({ sample: { code: 200, message: "hello world" } });
  });
});

describe("withCors", () => {
  it("sets the ACAO on the output headers", () => {
    const cb = jest.fn(() => {});
    const output = { headers: {} };
    const error = "foo";

    withCors(cb)(error, output);
    expect(cb).toBeCalledWith("foo", {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
  });
});

describe("graphqlEndpoint", () => {
  it("returns a response from the sample root query", async () => {
    const event = {
      httpMethod: "POST",
      body: JSON.stringify({
        query: "{ sample { code message } }",
      }),
    };
    const { statusCode, body, headers } = await wrap({
      handler: graphqlEndpoint,
    }).run(event);
    expect(statusCode).toEqual(200);
    expect(JSON.parse(body)).toEqual({
      data: { sample: { code: 200, message: "hello world" } },
    });
    expect(headers["Content-Type"]).toEqual("application/json");
    expect(headers["Access-Control-Allow-Origin"]).toEqual("*");
  });
});

describe("graphiqlEndpoint", () => {
  it("returns a mini react app", async () => {
    const event = {
      httpMethod: "GET",
      isOffline: true,
    };
    const { statusCode, body, headers } = await wrap({
      handler: graphiqlEndpoint,
    }).run(event);
    expect(statusCode).toEqual(200);
    expect(body).toMatch(/GraphiQL/);
    expect(headers["Content-Type"]).toEqual("text/html");
  });
});
