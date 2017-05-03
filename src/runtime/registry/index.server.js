// @flow

/*
 *
 * We want to dynamically load modules based on the filesystem
 * BUT, we don't want it to be async, since the server will
 * run through a sync rendering of the tree during a request
 *
 */

import { mapProps } from "recompose";

import Junction from "../../junction";

export const load = mapProps(({ ...rest, registry }) => ({
  ...rest,
  components: registry.blocks.map(({ ...details, path }) => ({
    ...details,
    path,
    // $FlowIgnore
    Component: require(`../../blocks/${path}/index.js`).default,
  })),
}));

export default Junction().with(load);
