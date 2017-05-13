// @flow

import type { IBlockDefinition } from "../runtime/registry/util/types";

export const render = ({ ...rest, id, Component }: IBlockDefinition) => (
  <Component key={id} {...rest} />
);
