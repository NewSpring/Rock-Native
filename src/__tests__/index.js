import React from "react";
// import renderer from "react-test-renderer";
import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import { state, actions, counterStyle } from "../";
import Counter from "../counter.native";

const defaultProps = { increment: jest.fn(), decrement: jest.fn(), counter: 0 };
const generateComponent = addlProps => (
  <Counter {...defaultProps} {...addlProps} />
);

describe("state", () => {
  it("works", async done => {
    let hasMounted = false;
    const noop = ({ counter, setCounter }) => {
      // test initial state
      if (!hasMounted) expect(counter).toEqual(0);

      //test running setCounter
      if (counter === 0) setCounter(1);
      if (counter === 1) done();

      if (!hasMounted) hasMounted = true;
      return null;
    };
    const MiniApp = await state(noop); // must await or react perf error will show
    await shallow(<MiniApp />);
  });

  it("works with defaultValue", async done => {
    let hasMounted = false;
    const noop = ({ counter, setCounter }) => {
      // test initial state
      if (!hasMounted) expect(counter).toEqual(10);

      if (counter === 10) setCounter(1);
      if (counter === 1) done();

      if (!hasMounted) hasMounted = true;
      return null;
    };
    const MiniApp = await state(noop); // must await or react perf error will show
    await shallow(<MiniApp defaultValue={10} />);
  });
});

// #increment :: Function
// increment: ({ setCounter }) => () => setCounter(n => n + 1),
describe("actions", () => {
  let increment;
  let decrement;
  // define initial state
  let n = 0;
  const setCounter = jest.fn(stateUpdater => {
    n = stateUpdater(n);
    return n;
  });
  // create noop function to capture props from withHandlers
  const noop = props => {
    increment = props.increment;
    decrement = props.decrement;
    return null;
  };

  beforeEach(async () => {
    // acutally run actions function
    const MiniApp = await actions(noop); // await or perf errors
    shallow(<MiniApp setCounter={setCounter} />);
  });

  afterEach(() => {
    n = 0;
    setCounter.mockClear();
  });

  it("has an increment function which increases the inital value", () => {
    increment();
    // verify it was called in the render of the noop
    expect(setCounter).toBeCalled();
    expect(n).toBe(1);
  });

  it("has an decrement function which decreases the inital value", () => {
    decrement();
    // verify it was called in the render of the noop
    expect(setCounter).toBeCalled();
    expect(n).toBe(-1);
  });
});

describe("counerStyle", () => {
  it("should resolve to object with or without props", () => {
    const a = expect(typeof counterStyle.resolve()).toBe("object");
    const b = expect(typeof counterStyle.resolve({ hey: "there" })).toBe(
      "object",
    );
    expect(a).toEqual(b);
  });
});

describe("counter", () => {
  it("should load page", () => {
    const tree = shallow(generateComponent());
    expect(tree).toBeDefined();
    expect(shallowToJson(tree)).toMatchSnapshot();
  });
  it("finds buttons", async () => {
    const tree = shallow(generateComponent());
    expect(tree.find("Button")).toHaveLength(2);
  });
  it("should find total count", async () => {
    const tree = shallow(generateComponent());
    expect(tree.find("Text")).toHaveLength(1);
  });
  it("should identify platform <default>", async () => {
    const tree = shallow(generateComponent());
    expect(tree.find("Text").props().children).toContain("ios");
  });
  it("should increment with click on increment button", async () => {
    const fn = jest.fn();
    const tree = shallow(generateComponent({ increment: fn }));
    const button = tree.find("Button").first();
    button.simulate("press");
    expect(fn).toBeCalled();
  });
  it("should decrement with click on decrement button", async () => {
    const fn = jest.fn();
    const tree = shallow(generateComponent({ decrement: fn }));
    const button = shallow(tree.find("Button").get(1));
    button.simulate("press");
    expect(fn).toBeCalled();
  });
  it("should follow multiple interactions", async () => {
    const fnUp = jest.fn();
    const fnDown = jest.fn();
    const tree = shallow(
      generateComponent({ decrement: fnDown, increment: fnUp }),
    );
    const up = tree.find("Button").first();
    const down = shallow(tree.find("Button").get(1));
    up.simulate("press");
    up.simulate("press");
    down.simulate("press");
    down.simulate("press");
    expect(fnDown).toHaveBeenCalledTimes(2);
    expect(fnUp).toHaveBeenCalledTimes(2);
  });
});
