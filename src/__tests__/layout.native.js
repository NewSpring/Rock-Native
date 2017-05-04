import { Text } from "react-native";
import renderer from "react-test-renderer";
import Layout from "../layout.native";

const testProps = [
  {
    path: "Counter",
    id: "1",
    Component: () => <Text>Hello World</Text>,
  },
  {
    path: "HelloWorld",
    id: "2",
    Component: () => <Text>Hello World Redux</Text>,
  },
];

describe("layout native", () => {
  it("works", () => {
    const tree = renderer.create(<Layout components={testProps} />);
    expect(tree).toMatchSnapshot();
  });
});
