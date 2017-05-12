// @flow

import { render } from "../";
import { layoutStyle } from "./";

import type { ILayoutProps } from "../../../runtime/registry/util/types";

export default ({ zones }: ILayoutProps) =>
  (console.log(zones), (
    <div>
      <div>
        Web Horizontal Layout
      </div>
      <div style={layoutStyle.resolve()}>
        {/* main zone */}
        <div>
          {zones.main.map(render)}
        </div>
        {/* secondary zone */}
        <div>
          {zones.secondary.map(render)}
        </div>
      </div>
    </div>
  ));
