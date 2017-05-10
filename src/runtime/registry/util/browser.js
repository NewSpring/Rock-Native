// @flow
import type { Component } from "react";
import { withState, lifecycle, branch } from "recompose";
// import Junction from "../../../junction";
import type { IBlockDescription, IRegistryRequest, IState } from "./types.js";

// XXX lookup how to do recompose types
export const blockState = withState(
  "components",
  "load",
  (props: { registry: IRegistryRequest }) => props.registry.blocks,
);

export const layoutState = withState(
  "Layout",
  "loadLayout",
  (props: { registry: IRegistryRequest }) => props.registry.layout,
);

export const shouldShowLoader = branch(
  ({ components, Layout }: IState) =>
    typeof Layout === "string" &&
    components.map(x => x.Component).filter(x => Boolean(x)).length === 0,
  () => () => null,
);

// this function takes an obect and returns back a Promise
// this promise eventually returns back to the original
// shape of the object
// its use case is to map over objects, wait until all promises are done
// then go back to original shape
// XXX should this be abastracted into a promise loading util?
export const recombineLoadedComponent = ({
  ...rest,
  Component,
}: IBlockDescription): Promise<IBlockDescription> =>
  // return a promise so it can be waited on
  Component.then((loadedComponent: Component) => ({
    ...rest,
    // using the scope capture from the wrapper function,
    // reapply the object (using ...rest)
    // and update the Component (was a promise) with the result
    // of the promise
    Component: loadedComponent,
  }));

// type for dynamic import of a react component
type IDynamicImport = (path: string) => Promise<{ default: Component }>;

type IDynamicallyImport = (
  loader: IDynamicImport,
  stateUpdater: () => void, // XXX figure out more exact type
  components: IBlockDescription[],
  recombineLoadedComponent: (
    a: IBlockDescription,
  ) => Promise<IBlockDescription>,
) => Promise<void>;

export const dynamicallyImportComponent: IDynamicallyImport = (
  loader,
  stateUpdater,
  components,
  recombineLoadedComponent = recombineLoadedComponent,
) =>
  // return an array of promises so we can wait until
  // all of the blocks are loaded before updating the state
  // otherwise when each block would load, it would rerender the app
  // causing a bad experience
  Promise.all(
    // components need to be reshaped into a promise
    components
      .map(({ path, ...rest }) => ({
        ...rest,
        // this is where the dynamic import actually happens
        // es6 modules return { default: React$Component }
        // XXX integrate caching here
        Component: loader(path).then((x: { default: Component }) => x.default),
      }))
      // now that we have kicked off the dynamic import
      // we reshape the array into an array of promises
      .map(recombineLoadedComponent),
    // now that all promises are done, we can update the parent component
    // state and render the app with all of the blocks loaded
  ).then(stateUpdater);

export const newLifecycle = (
  dynamicBlockLoader: IDynamicImport,
  dynamicLayoutLoader: IDynamicImport,
  // dynamicallyImportComponent: IDynamicallyImport = dynamicallyImportComponent,
) =>
  lifecycle({
    componentDidMount() {
      // XXX this will render twice since we are using two different stateUpdaters
      // we should combine them together after both the layout and blocks are
      // loaded from the http request and update all at once
      dynamicLayoutLoader(this.props.Layout).then(component =>
        this.props.loadLayout(component.default),
      );
      console.log(this.props);
      dynamicallyImportComponent(
        dynamicBlockLoader,
        this.props.load,
        this.props.components,
        recombineLoadedComponent,
      );
    },
  });
