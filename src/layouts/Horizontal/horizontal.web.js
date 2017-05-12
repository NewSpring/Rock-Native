// @flow

import type { ILayoutProps } from "./";
import { layoutStyle } from "./";

export default ({ components }: ILayoutProps) =>
  (console.log(components), (
    <div>
      <div>
        Web Horizontal Layout
      </div>
      <div style={layoutStyle.resolve()}>
        {components
          .sort((a, b) => {
            return b.order - a.order;
          })
          .map(({ ...rest, id, Component }) => (
            <Component key={id} {...rest} />
          ))}
      </div>
    </div>
  ));
