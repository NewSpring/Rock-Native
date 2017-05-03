// @flow
import type { Component } from "react";
import { withState, lifecycle, branch } from "recompose";
// import Junction from "../../../junction";
import type { IBlockDescription, IRegistryRequest, IState } from "./types.js";

// XXX lookup how to do recompose types
export const state = withState(
  "components",
  "load",
  (props: { registry: IRegistryRequest }) => props.registry.blocks,
);

export const shouldShowLoader = branch(
  ({ components }: IState) =>
    components.map(x => x.Component).filter(x => Boolean(x)).length === 0,
  () => () => null,
);

// type for dynamic import of a react component
type IDynamicImport = (path: string) => Promise<{ default: Component }>;

export const recombineLoadedComponent = ({
  ...rest,
  Component,
}: IBlockDescription): Promise<IBlockDescription> =>
  Component.then((loadedComponent: Component) => ({
    ...rest,
    Component: loadedComponent,
  }));

const dynmicallyImportComponent = (
  loader: IDynamicImport,
  // XXX figure out more exact type
  stateUpdater: () => void,
  components: IBlockDescription[],
): Promise<void> =>
  Promise.all(
    components
      .map(({ path, ...rest }) => ({
        ...rest,
        Component: loader(path).then((x: { default: Component }) => x.default),
      }))
      .map(recombineLoadedComponent),
  ).then(stateUpdater);

export const newLifecycle = (dynamicallyImport: IDynamicImport) =>
  lifecycle({
    componentDidMount() {
      dynmicallyImportComponent(
        dynamicallyImport,
        this.props.load,
        this.props.components,
      );
    },
  });
