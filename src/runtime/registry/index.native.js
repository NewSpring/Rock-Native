// @flow

import type, { Component } from "react";
import Junction from "../../junction";
import { mapProps } from "recompose";

import HelloWorld from "../../blocks/HelloWorld";
import Counter from "../../blocks/Counter";

const available = {
  HelloWorld: HelloWorld,
  Counter: Counter,
};

export const load = mapProps(({ ...rest, registry }) => ({
  ...rest,
  components: registry.blocks.map(({ ...details, path }) => ({
    ...details,
    path,
    Component: available[path],
  })),
}));

export default Junction().with(load);
