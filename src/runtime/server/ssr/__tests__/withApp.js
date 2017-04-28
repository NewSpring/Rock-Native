import withApp from "../withApp";

it("returns a function when given a component", () => {
  const handler = withApp(() => <div>hello world</div>);
  expect(typeof handler).toEqual("function");
});

it("adds ctx, event, and the component to a resulting object", () => {
  const App = () => <div>hello world</div>;
  const event = { path: "here" };
  const ctx = { done: jest.fn(), succeed: jest.fn() };
  const result = withApp(App)(event, ctx);
  expect(result).toEqual({
    ctx,
    path: "here",
    context: {},
    App,
  });
});
