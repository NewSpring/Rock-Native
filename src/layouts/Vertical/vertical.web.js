// @flow

import { render } from "../";
import { layoutStyle } from "./";

import type { ILayoutProps } from "../../runtime/registry/util/types";

export default ({ zones }: ILayoutProps) => (
  <div>
    <div>
      Web Vertical Layout
    </div>
    <div style={layoutStyle.resolve()}>
      <div>
        {zones.main && zones.main.map(render)}
      </div>
      {/* secondary zone */}
      <div>
        {zones.secondary && zones.secondary.map(render)}
      </div>
    </div>
  </div>
);
