// @flow

import { mapProps } from "recompose";
import Junction from "../../junction";

import type { IRegistryRequest } from "./util/types";

// $FlowIgnore
import * as availableBlocks from "glob:../../blocks/*";
// $FlowIgnore
import * as availableLayouts from "glob:../../layouts/*";

export const mapOverBlocks = ({
  ...rest,
  registry,
}: {
  registry: IRegistryRequest,
}) => ({
  ...rest,
  components: registry
    ? registry.blocks.map(({ ...details, path }) => ({
        ...details,
        path,
        Component: availableBlocks[path],
      }))
    : [],
});

export const loadBlocks = mapProps(mapOverBlocks);

export const loadLayout = mapProps(
  ({ ...rest, registry }: { registry: IRegistryRequest }) => ({
    ...rest,
    registry,
    Layout: availableLayouts[registry.layout],
  }),
);

export default Junction().with(loadLayout).with(loadBlocks);
