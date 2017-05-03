import { wrap } from "lambda-wrapper";

import {
  createContextFromRequestEvent,
  withCors,
  graphqlEndpoint,
  graphiqlEndpoint,
} from "../graphql";

describe("createContextFromRequestEvent", () => {
  it("includes a userId if authorization is passed", () => {
    const { userId } = createContextFromRequestEvent({
      headers: { authorization: "1234" },
    });
    expect(userId).toEqual("1234");
  });
  it("includes an ip if passed", () => {
    const { ip } = createContextFromRequestEvent({
      requestContext: { identity: { sourceIp: "1234" } },
    });
    expect(ip).toEqual("1234");
  });
  it("does't throw if missing info", () => {
    const { ip, userId } = createContextFromRequestEvent({});
    expect(ip).toBeUndefined();
    expect(userId).toBeUndefined();
  });
  it("sets dev based on stage", () => {
    const { isDev } = createContextFromRequestEvent({
      requestContext: { stage: "dev" },
    });
    expect(isDev).toEqual(true);
  });
  it("sets dev based on stage", () => {
    const { isDev } = createContextFromRequestEvent({
      requestContext: { stage: "prod" },
    });
    expect(isDev).toEqual(false);
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
