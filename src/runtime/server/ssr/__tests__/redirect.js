import redirect from "../redirect";

it("calls done on the context", () => {
  const ctx = {
    done: jest.fn(() => {}),
  };
  const context = { url: "/home" };
  redirect({ ctx, context });
  expect(ctx.done).toBeCalled();
});

it("calls done with the correct url", () => {
  const ctx = {
    done: jest.fn(err => ctx._error = err),
  };
  const context = { url: "/home" };
  redirect({ ctx, context });
  expect(ctx.done).toBeCalled();
  expect(ctx._error.name).toEqual("/home");
});

it("calls done with the correct error", () => {
  const ctx = {
    done: jest.fn(err => ctx._error = err),
  };
  const context = { url: "/home" };
  redirect({ ctx, context });
  expect(ctx.done).toBeCalled();
  expect(ctx._error.message).toMatch(
    /HandlerDemo.ResponseFound Redirection: Resource found elsewhere/,
  );
  expect(ctx._error instanceof Error).toEqual(true);
});
