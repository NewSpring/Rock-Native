// @flow

import type { ILayoutProps } from "./vertical.native.js";
import { layoutStyle } from "./";

export default ({ components }: ILayoutProps) => (
  <div>
    <div>
      Web Vertical Layout
    </div>
    <div style={layoutStyle.resolve()}>
      {components.map(({ ...rest, id, Component }) => (
        <Component key={id} {...rest} />
      ))}
    </div>
  </div>
);
