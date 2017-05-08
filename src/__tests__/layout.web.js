import renderer from "react-test-renderer";
import Layout from "../layout.web";

const testProps = [
  {
    path: "Counter",
    id: "1",
    Component: () => <h1>Hello World</h1>,
  },
  {
    path: "HelloWorld",
    id: "2",
    Component: () => <p>Hello World Redux</p>,
  },
];

describe("layout web", () => {
  it("works", () => {
    const tree = renderer.create(<Layout components={testProps} />);
    expect(tree).toMatchSnapshot();
  });
});
