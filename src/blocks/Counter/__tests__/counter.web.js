import React from "react";
import renderer from "react-test-renderer";
import { shallow } from "enzyme";

import Counter from "../counter.web.js";

it("shows a counter count on web", () => {
  const tree = renderer.create(<Counter counter={1} />);
  expect(tree).toMatchSnapshot();
});

it("loading state", () => {
  const tree = renderer.create(<Counter counter={1} loading={true} />);
  expect(tree).toMatchSnapshot();
});

it("shows data from the server", () => {
  const sample = { code: 200, message: "hello world" };
  const tree = renderer.create(<Counter counter={1} sample={sample} />);
  expect(tree).toMatchSnapshot();
});

it("handles a click for increment", () => {
  const increment = jest.fn();
  const wrapper = shallow(<Counter counter={1} increment={increment} />);
  wrapper.find("button").first().simulate("click");
  expect(increment).toBeCalled();
});

it("handles a click for decrement", () => {
  const decrement = jest.fn();
  const wrapper = shallow(<Counter counter={1} decrement={decrement} />);
  wrapper.find("button").at(1).simulate("click");
  expect(decrement).toBeCalled();
});
