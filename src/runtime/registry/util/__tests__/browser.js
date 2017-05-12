import { mount } from "enzyme";
import {
  state,
  shouldShowLoader,
  recombineLoadedComponent,
  dynamicallyImportComponent,
  newLifecycle,
} from "../browser";

// for enzyme mount
import jsdom from "jsdom";
const doc = jsdom.jsdom("<!doctype html><html><body></body></html>");
const win = doc.defaultView;
global.document = doc;
global.window = win;

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

describe("state wrapper", () => {
  it("should wrap component with state and updater", async () => {
    const tester = jest.fn(() => <div />);
    const Wrapped = state(tester);
    mount(<Wrapped {...sampleProps} />);
    const props = tester.mock.calls[0][0];
    expect(props.imports).toBeDefined();
    expect(props.load).toBeDefined();
  });
});

describe("shouldShowLoader", () => {
  it("should be a preloaded recompose branch", () => {
    // XXX it should have a true state loaded (renders null)
    // XXX still needs a false state
    expect(typeof shouldShowLoader).toBe("function");
    const WithRight = shouldShowLoader(() => <div />);
    expect(typeof WithRight).toBe("function");
    expect(WithRight.displayName).toBeDefined();
  });

  it("should follow left if no components", () => {
    const WithRight = shouldShowLoader(() => <div />);
    expect(mount(<WithRight components={[]} />).html()).toBe(null);
  });

  it("should follow right if there are components", () => {
    const WithRight = shouldShowLoader(() => <div />);
    const withComponents = mount(
      <WithRight components={[{ Component: "hey" }]} />,
    );
    expect(withComponents.html()).toBe("<div></div>");
  });
});

describe("recombineLoadedComponent", () => {
  it("awaits the component load", async () => {
    const loaded = await recombineLoadedComponent({
      Component: Promise.resolve({ path: "hey", Component: () => null }),
    });
    expect(loaded.Component.path).toBe("hey");
    expect(typeof loaded.Component.Component).toBe("function");
  });

  it("passes additional props through", async () => {
    const loaded = await recombineLoadedComponent({
      Component: Promise.resolve({ path: "", Component: () => null }),
      whoBeRollinInTheStreets: "dat boi",
    });
    expect(loaded.whoBeRollinInTheStreets).toBe("dat boi");
  });
});

describe("dynamicallyImportComponent", () => {
  it("calls loader with correct path", () => {
    const loader = jest.fn(() => Promise.resolve({ default: null }));
    const loader2 = jest.fn(() => Promise.resolve({ default: null }));
    const stateUpdater = jest.fn();
    const registry = {
      layout: "foo",
      blocks: [{ path: "A" }],
    };
    dynamicallyImportComponent(
      loader,
      loader2,
      stateUpdater,
      registry,
      () => {},
    );
    expect(loader).toBeCalledWith("A");
    expect(loader2).toBeCalledWith("foo");
  });

  it("calls recombineLoadedComponent with with correct component info", async () => {
    // loader is a mock for import("./foo");
    const loader = jest.fn(() => Promise.resolve({ default: "hello world" }));
    const loader2 = jest.fn(() => Promise.resolve({ default: "layout" }));

    // stateUpdater is a mock for this.setState({})
    const stateUpdater = jest.fn();
    // actual data to load from the file system
    const registry = {
      layout: "foo",
      blocks: [{ path: "A" }],
    };
    // reshape to map resolved component back to array of components
    const recombine = jest.fn(({ Component, ...rest }) =>
      Component.then(result => ({
        ...rest,
        Component: result,
      })),
    );
    await dynamicallyImportComponent(
      loader,
      loader2,
      stateUpdater,
      registry,
      recombine,
    );
    const result = await recombine.mock.calls[0][0].Component;

    expect(result).toEqual("hello world");
    expect(stateUpdater).toBeCalledWith({
      Layout: "layout",
      components: [{ Component: "hello world" }],
    });
  });

  it("calls updateState with the correct info", async () => {
    const loader = jest.fn(() => Promise.resolve({ default: "hello world" }));
    const loader2 = jest.fn(() => Promise.resolve({ default: "layout" }));

    const stateUpdater = jest.fn();
    const registry = {
      layout: "foo",
      blocks: [{ path: "A" }],
    };
    const recombine = jest.fn(({ Component, ...rest }) =>
      Component.then(result => ({
        ...rest,
        Component: result,
      })),
    );
    await dynamicallyImportComponent(
      loader,
      loader2,
      stateUpdater,
      registry,
      recombine,
    );
    await recombine.mock.calls[0][0].Component;
    expect(stateUpdater).toBeCalledWith({
      Layout: "layout",
      components: [{ Component: "hello world" }],
    });
  });
});

describe("newLifecycle", () => {
  it("returns a HOC", () => {
    const Tester = jest.fn(() => <div />);
    const loader = jest.fn(() => Promise.resolve({ default: "dat ape" }));
    const hasLifecycle = newLifecycle(loader);
    const Wrapped = hasLifecycle(Tester);
    expect(typeof Wrapped).toBe("function");
    expect(Wrapped.displayName).toBe("lifecycle(mockConstructor)");
  });

  it("calls import util on mount", () => {
    const Tester = jest.fn(() => <div />);
    const loader = jest.fn(() => Promise.resolve({ default: "dat ape" }));
    const dynamicallyImport = jest.fn();
    const hasLifecycle = newLifecycle(loader, loader, dynamicallyImport);
    const Wrapped = hasLifecycle(Tester);
    mount(<Wrapped />);
    expect(dynamicallyImport).toBeCalled();
  });
});
