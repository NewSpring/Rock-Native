import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import HelloWorld from "../helloWorld.web.js";

const generateComponent = additionalProps => (
  <HelloWorld {...additionalProps} />
);

describe("Hello World Web", () => {
  it("should render the Hello World component for web", () => {
    const tree = shallow(generateComponent());
    expect(tree).toBeDefined();
    expect(shallowToJson(tree)).toMatchSnapshot();
  });
});
