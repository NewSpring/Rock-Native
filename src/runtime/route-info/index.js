/*
This component gets called/updated with every route change.
Using the route info, it makes an API call and returns a json object
with block information.

Example:
  <Router>
    <Route path="*" component={THIS COMPONENT}>
  </Router>
*/

import Junction from "../../junction";
import { lifecycle, defaultProps, withState } from "recompose";

export const state = withState("registry", "setBlockRegistry", null);
export const onlyOnce = withState("count", "setCount", 0); // XXX for testing

// XXX for testing
const registry = {
  blocks: [{ path: "HelloWorld", id: 2 }, { path: "Counter", id: 1 }],
};

export const lifecycles = lifecycle({
  //first load only
  componentWillMount() {
    // update from API call
    this.props.setBlockRegistry(registry);
  },
  componentWillReceiveProps(nextProps) {
    // only update if location changes
    if (this.props.count !== 0) return; // XXX for testing: only call once
    // if (this.props.location === nextProps.location) return;

    // update from api call
    this.props.setBlockRegistry(registry);
    this.props.setCount(1);
  },
});

// XXX for testing without router
// export const defaults = defaultProps({ location: "/give/now" });

export default Junction()
  // .with(defaults)
  .with(state)
  .with(onlyOnce)
  .with(lifecycles);
