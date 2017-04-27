import { typeDefs, resolvers, withCors, graphql } from "../graphql";

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
