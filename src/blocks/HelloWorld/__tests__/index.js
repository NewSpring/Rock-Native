import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import HelloWorld, { helloStyle } from "../";

const generateComponent = additionalProps => (
  <HelloWorld {...additionalProps} />
);

describe("Hello Style", () => {
  it("should resolve to object and match styles", () => {
    expect(typeof helloStyle.resolve()).toBe("object");
    expect(helloStyle.resolve()).toEqual({
      flex: 1,
      marginTop: 16,
      paddingTop: 32,
      justifyContent: "center",
      alignItems: "center",
    });
  });
});

describe("Hello World", () => {
  it("should render Hello World component", () => {
    const tree = shallow(generateComponent());
    expect(tree).toBeDefined();
    expect(shallowToJson(tree)).toMatchSnapshot();
  });
});
