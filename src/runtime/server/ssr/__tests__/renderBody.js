import React from "react";
import { Route } from "react-router";
import render from "../renderBody";

const Home = () => <h1>Home</h1>;
const Hello = () => <h3>Hello World</h3>;
const App = () => (
  <div>
    <Route exact path="/" component={Home} />
    <Route exact path="/hello" component={Hello} />
  </div>
);

it("renders the body of the app into a static router context", () => {
  const ctx = {};
  const context = {};
  const result = render({
    ctx,
    context,
    path: "/",
    App,
  });

  expect(result.body).toMatchSnapshot();
});

it("renders the body of the app into a static router context based on route", () => {
  const ctx = {};
  const context = {};
  const result = render({
    ctx,
    context,
    path: "/hello",
    App,
  });

  expect(result.body).toMatchSnapshot();
});
