import jsdom from "jsdom";
import { mount } from "enzyme";

import registry, { load, mapper } from "../";

const doc = jsdom.jsdom("<!doctype html><html><body></body></html>");
global.document = doc;

const sampleProps = {
  registry: {
    blocks: [
      { path: "Counter", stuff: "hey" },
      { path: "HelloWorld", stuff: "there" },
      { path: "C", stuff: "dawg" },
    ],
  },
  randomStuff: "waddup",
};

describe("props mapper", () => {
  it("passes additional props without change", () => {
    expect(mapper(sampleProps).randomStuff).toBe("waddup");
  });

  it("returns an object with a components key", () => {
    expect(mapper(sampleProps).components).toBeDefined();
  });

  it("passes the additional block details without change", () => {
    expect(mapper(sampleProps).components[0].stuff).toBe("hey");
  });

  it("passes path through to the final component object", () => {
    expect(mapper(sampleProps).components[0].path).toBe("Counter");
  });

  it("loads the components", () => {
    const components = mapper(sampleProps).components;
    expect(typeof components[0].Component).toBe("function");
    expect(typeof components[1].Component).toBe("function");
  });
});

describe("load", () => {
  it("should create a hoc with mapped props", () => {
    const markup = jest.fn(() => <h1>hello</h1>);
    const C = load(markup);
    mount(<C {...sampleProps} />);
    const props = markup.mock.calls[0][0];
    expect(props.components).toBeDefined();
  });
});

describe("registry (default)", () => {
  it("should create a component with registry", () => {
    const markup = jest.fn(() => <h1>hello</h1>);
    const C = registry.render(markup);
    expect(C.displayName).toBe("mapProps(mockConstructor)");
    mount(<C {...sampleProps} />);
    const props = markup.mock.calls[0][0];
    expect(props.components).toBeDefined();
  });
});
