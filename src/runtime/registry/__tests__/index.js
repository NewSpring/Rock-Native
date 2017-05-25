/**
 * @jest-environment jsdom
 */

import { mount } from "enzyme";
import { loadBlocks, mapOverBlocks, loadLayout } from "../";

const sampleProps = {
  registry: {
    layout: "Vertical",
    blocks: [
      { path: "Counter", stuff: "hey" },
      { path: "HelloWorld", stuff: "there" },
      { path: "C", stuff: "dawg" },
    ],
  },
  randomStuff: "waddup",
};

describe("props mapOverBlocks", () => {
  it("returns a default array if no registry", () => {
    expect(mapOverBlocks({ id: 1 })).toEqual({ id: 1, components: [] });
  });
  it("passes additional props without change", () => {
    expect(mapOverBlocks(sampleProps).randomStuff).toBe("waddup");
  });

  it("returns an object with a components key", () => {
    expect(mapOverBlocks(sampleProps).components).toBeDefined();
  });

  it("passes the additional block details without change", () => {
    expect(mapOverBlocks(sampleProps).components[0].stuff).toBe("hey");
  });

  it("passes path through to the final component object", () => {
    expect(mapOverBlocks(sampleProps).components[0].path).toBe("Counter");
  });

  it("loads the components", () => {
    const components = mapOverBlocks(sampleProps).components;
    expect(typeof components[0].Component).toBe("function");
    expect(typeof components[1].Component).toBe("function");
  });
});

describe("loadBlocks", () => {
  it("should create a hoc with mapped props", () => {
    const markup = jest.fn(() => <h1>hello</h1>);
    const C = loadBlocks(markup);
    mount(<C {...sampleProps} />);
    const props = markup.mock.calls[0][0];
    expect(props.components).toBeDefined();
  });
});

describe("loadLayout", () => {
  it("should create a HOC with mapped props", () => {
    const markup = jest.fn(() => <h1>hello</h1>);
    const C = loadLayout(markup);
    mount(<C {...sampleProps} />);
    const props = markup.mock.calls[0][0];
    expect(props.Layout).toBeDefined();
  });
});
