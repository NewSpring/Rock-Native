import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import HelloWorld from "../helloWorld.native.js";

const generateComponent = additionalProps => (
  <HelloWorld {...additionalProps} />
);

describe("Hello World Native", () => {
  it("should render the Hello World component for native", () => {
    const tree = shallow(generateComponent());
    expect(tree).toBeDefined();
    expect(shallowToJson(tree)).toMatchSnapshot();
  });
});
