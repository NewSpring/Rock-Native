// @flow
import { withState, lifecycle, branch } from "recompose";

import type { Component } from "react";

import Junction from "../../junction";

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

export type IBlockDescrpition = {
  path: string,
  Component?: Component,
};

export type IRegistryRequest = {
  blocks: IBlockDescription[],
};

// Component needs to have state, needs to have a state updater (this will be used for rendering the blocks after they are loaded)

export type IState = {
  components: IBlockDescription[],
};

const state = withState(
  "components",
  "load",
  (props: { registry: IRegistryRequest }) => props.registry.blocks,
);

export type IRegistryProps = {
  registry: IRegistryRequest,
};

const loader = lifecycle({
  componentDidMount() {
    const { load, components } = this.props;

    const promises: Promise<IBlockDescription>[] = components
      .map(({ path, ...rest }) => ({
        ...rest,
        Component: import(`../../blocks/${path}/index.js`),
      }))
      .map(({ ...rest, Component }) =>
        Component.then(loadedComponent => ({
          ...rest,
          Component: loadedComponent.default,
        })),
      );

    Promise.all(promises).then(load);
  },
});

const shouldShowLoader = branch(
  props =>
    props.components.map(x => x.Component).filter(x => Boolean(x)).length === 0,
  () => () => null,
);

export default Junction()
  .with(state) // sync
  .with(loader) // async (lifecycles)
  .with(shouldShowLoader); // async
// .render(AwesomeTown);
