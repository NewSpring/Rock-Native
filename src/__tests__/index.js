import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import { defaultProps } from "recompose";
import Comps, { layoutStyle } from "../index.js";

const registry = {
  blocks: [{ path: "HelloWorld", id: 2 }, { path: "Counter", id: 1 }],
};
const props = defaultProps({ registry });
const generateComponent = additionalProps => (
  <Comps {...props} {...additionalProps} />
);

describe("Layout Style", () => {
  it("should resolve to object and match styles", () => {
    expect(typeof layoutStyle.resolve()).toBe("object");
    expect(layoutStyle.resolve()).toEqual({ flex: 1 });
  });
});

describe("Index", () => {
  it("should render the components", () => {
    const tree = shallow(generateComponent());
    expect(tree).toBeDefined();
    expect(shallowToJson(tree)).toMatchSnapshot();
  });
});
