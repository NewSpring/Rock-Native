// @flow

import type { ILayoutProps } from "./layout.native.js";

export default ({ components }: ILayoutProps) => (
  <div>
    {components.map(({ ...rest, id, Component }) => (
      <Component key={id} {...rest} />
    ))}
  </div>
);
