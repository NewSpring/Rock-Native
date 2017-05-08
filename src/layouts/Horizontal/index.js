// @flow

import Style from "@jongold/further";
import Horizontal from "./horizontal";
import type {
  IBlockDescription,
} from "../../runtime/registry/index.browser.js";

export type ILayoutProps = {
  components: IBlockDescription[],
};

export const layoutStyle = Style.of({
  flexDirection: "row",
  justifyContent: "center",
  height: "100%",
  marginTop: "50%",
});

export default Horizontal;
