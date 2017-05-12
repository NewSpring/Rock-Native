import React from "react";
import renderer from "react-test-renderer";

import Counter from "../counter.native.js";

const i = jest.fn(() => {});
it("shows a counter count on native", () => {
  const tree = renderer.create(
    <Counter increment={i} decrement={i} counter={1} />,
  );
  expect(tree).toMatchSnapshot();
});

it("loading state", () => {
  const tree = renderer.create(
    <Counter increment={i} decrement={i} counter={1} loading={true} />,
  );
  expect(tree).toMatchSnapshot();
});

it("shows data from the server", () => {
  const sample = { code: 200, message: "hello world" };
  const tree = renderer.create(
    <Counter increment={i} decrement={i} counter={1} sample={sample} />,
  );
  expect(tree).toMatchSnapshot();
});

// it("handles a press for increment", () => {
//   const increment = jest.fn();
//   const wrapper = shallow(<Counter counter={1} increment={increment} />);
//   wrapper.find("button").first().simulate("press");
//   expect(increment).toBeCalled();
// });
//
// it("handles a press for decrement", () => {
//   const decrement = jest.fn();
//   const wrapper = shallow(<Counter counter={1} decrement={decrement} />);
//   wrapper.find("button").at(1).simulate("press");
//   expect(decrement).toBeCalled();
// });
