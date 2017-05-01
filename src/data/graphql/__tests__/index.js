import { typeDefs, resolvers, graphql } from "../";

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
