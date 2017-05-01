import React from "react";
import { Route, Redirect } from "react-router";

import handler from "../";

const event = {
  path: "/",
};

const context = {
  __result: false,
  done: jest.fn(e => {
    context.__result = e;
  }),
  succeed: jest.fn(result => {
    context.__result = result;
  }),
};

const App = () => <h1>Hello World</h1>;

describe("ssr", () => {
  beforeEach(() => {
    context.succeed.mockClear();
    context.done.mockClear();
    delete context.__result;
  });

  it("resolves a simple app correctly", () => {
    handler(App)(event, context);
    expect(context.succeed).toBeCalled();
    expect(context.__result.body).toMatch(/Hello World/);
  });

  it("resolves an app with a route correctly", () => {
    const Hello = () => <h1>Hai World</h1>;
    const LocalApp = () => (
      <div>
        <Route exact path="/" component={Hello} />
      </div>
    );
    handler(LocalApp)(event, context);
    expect(context.succeed).toBeCalled();
    expect(context.__result.body).toMatch(/Hai World/);
  });

  it("resolves an app with a route correctly", () => {
    const LocalApp = () => (
      <div>
        <Redirect
          to={{
            pathname: "/login",
          }}
        />
      </div>
    );
    handler(LocalApp)(event, context);
    expect(context.succeed.mock.calls.length).toEqual(0);
    expect(context.done).toBeCalled();
    expect(context.__result.name).toEqual("/login");
  });
});
