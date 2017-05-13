import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import Horizontal from "../horizontal.native.js";
import Counter from "../../../blocks/Counter";
import HelloWorld from "../../../blocks/HelloWorld";

const layoutProps = {
  zones: {
    secondary: [{ id: 1, path: "Counter", Component: Counter, order: 0 }],
    main: [{ id: 2, path: "HelloWorld", Component: HelloWorld, order: 1 }],
  },
};

const generateComponent = additionalProps => (
  <Horizontal {...layoutProps} {...additionalProps} />
);

describe("Horizontal Native Layout", () => {
  it("should render Horizontal layout component", () => {
    const tree = shallow(generateComponent());
    expect(tree).toBeDefined();
    expect(shallowToJson(tree)).toMatchSnapshot();
  });
});
