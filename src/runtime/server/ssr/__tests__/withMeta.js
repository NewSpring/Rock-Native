import Helmet from "react-helmet";
import withMeta from "../withMeta";

jest.mock("react-helmet", () => ({
  renderStatic: jest.fn(() => ({ foo: "bar" })),
}));

it("passes down the rest of the object with an additional metadata object", () => {
  const result = withMeta({ foobar: true });
  expect(result).toEqual({
    foobar: true,
    metadata: {
      foo: "bar",
    },
  });

  expect(Helmet.renderStatic).toBeCalled();
});
