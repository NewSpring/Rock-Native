/*
 * XXX: We can't flowtype this file without v.0.45.0, because that
 * was the version that dynamic import support was added. We can't
 * upgrade to 0.45.0 yet, because react-native isn't typed with that version
 * https://github.com/facebook/flow/pull/3544
 */
import Junction from "../../junction";
import { newLifecycle, state, shouldShowLoader } from "./util/browser";

/*
 * Dynamic import registry for the browser
 * It returns a component which dynamically loads blocks from the /blocks folder
 * as well as loads a layout from the layout folders XXX
 * given a data shape describing what needs to be loaded
 *
 * It is an async rerender component so it has local state of the blocks in use
 * It also manages a loading state :yay:
 *
 */
export const loader = newLifecycle(path =>
  import(`../../blocks/${path}/index.js`));

/*
 * state: sync,
 * loader: async (lifecycle),
 * shouldShowLoader: async
 */
export default Junction().with(state).with(loader).with(shouldShowLoader);
