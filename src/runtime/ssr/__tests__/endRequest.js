import end from "../endRequest";

it("calls succeed on the context", () => {
  const ctx = {
    succeed: jest.fn(() => {}),
  };

  end({ ctx });
  expect(ctx.succeed).toBeCalled();
});

it("calls succeed on the context with the correct info", () => {
  const ctx = {
    succeed: jest.fn(() => {}),
  };

  end({ ctx, html: "hello" });
  expect(ctx.succeed).toBeCalled();
  expect(ctx.succeed).toBeCalledWith({
    statusCode: 200,
    headers: {
      "Content-Type": "text/html",
      "Access-Control-Allow-Origin": "*",
    },
    body: "hello",
  });
});
