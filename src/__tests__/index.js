import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import { defaultProps } from "recompose";
import Comps, {
  layoutStyle,
  loadingState,
  loadingCheck,
  Loading,
} from "../index.js";

const registry = {
  layout: "Vertical",
  blocks: [
    { id: 1, path: "HelloWorld", zone: 0, order: 0 },
    { id: 2, path: "Counter", zone: 0, order: 1 },
  ],
};
const props = defaultProps({ registry });
const generateComponent = additionalProps => (
  <Comps {...props} {...additionalProps} />
);

describe("Index", () => {
  // XXX figure out how to test this with react-router
  it("should render the components", () => {
    const tree = shallow(generateComponent());
    expect(tree).toBeDefined();
    expect(shallowToJson(tree)).toMatchSnapshot();
  });
});

describe("loadingCheck", () => {
  it("should be false if not explicitly said to be loading", () => {
    expect(loadingCheck()).toEqual(false);
  });
  it("should be true if loading key is true", () => {
    expect(loadingCheck({ loading: true })).toEqual(true);
  });
});

describe("Loading", () => {
  // XXX UPDATE WHEN WE HAVE A REAL ONE
  it("should render loading state (null)", () => {
    const component = shallow(<Loading />);
    expect(component.html()).toEqual(null);
  });
});

describe("loadingState", () => {
  it("is a recompose hoc", () => {
    const state = loadingState(() => () => null);
    expect(typeof state).toEqual("function");
    expect(state.displayName).toEqual("branch(Component)");
  });
});
