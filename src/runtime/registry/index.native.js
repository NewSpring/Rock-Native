// @flow

import type, { Component } from "react";
import { mapProps } from "recompose";
import Junction from "../../junction";

// $FlowIgnore
import * as availableBlocks from "glob:../../blocks/*";

export const load = mapProps(({ ...rest, registry }) => ({
  ...rest,
  components: registry.blocks.map(({ ...details, path }) => ({
    ...details,
    path,
    Component: availableBlocks[path],
  })),
}));

export default Junction().with(load);
