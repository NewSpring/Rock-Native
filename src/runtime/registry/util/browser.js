// @flow
import type { Component } from "react";
import { withState, lifecycle, branch, mapProps } from "recompose";
// import Junction from "../../../junction";
import type {
  IBlockDescription,
  IRegistryRequest,
  IRegistryProps,
  IState,
} from "./types.js";

export const state = withState("imports", "load", { components: [] });

// reshape to match registry shape
export const mapImports = mapProps((props: IRegistryProps) => ({
  ...props,
  components: props.imports.components,
  Layout: props.imports.Layout,
}));

// determine if a loading state should be shown while importing blocks
export const shouldShowLoader = branch(
  ({ components, Layout }: IState) =>
    !Layout &&
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
  blockLoader: IDynamicImport,
  layoutLoader: IDynamicImport,
  stateUpdater: () => void, // XXX figure out more exact type
  components: IRegistryRequest,
  recombineLoadedComponent: (
    a: IBlockDescription,
  ) => Promise<IBlockDescription>,
) => Promise<void>;

// dynamic imports load es6 modules as { default: export default }
// so we map then to the intended export
export const es6module = (x: { default: Component }) => x.default;
// the dynamicallyImportComponent returns an array of promises with the layout
// first, then all loaded components following. Since this number is dynamic
// we use a rest argument to join them into an array (thank you es6)
export const mapPromises = ([Layout, ...components]: Component[]) => ({
  components,
  Layout,
});

export const dynamicallyImportComponent: IDynamicallyImport = (
  blockLoader,
  layoutLoader,
  stateUpdater,
  registry,
  recombineLoadedComponent = recombineLoadedComponent,
) =>
  // return an array of promises so we can wait until
  // all of the blocks are loaded before updating the state
  // otherwise when each block would load, it would rerender the app
  // causing a bad experience
  Promise.all(
    // load layout component
    [layoutLoader(registry.layout).then(es6module)].concat(
      // components need to be reshaped into a promise
      registry.blocks
        .map(({ path, ...rest }) => ({
          ...rest,
          // this is where the dynamic import actually happens
          // es6 modules return { default: React$Component }
          // XXX integrate caching here
          Component: blockLoader(path).then(es6module),
        }))
        // now that we have kicked off the dynamic import
        // we reshape the array into an array of promises
        .map(recombineLoadedComponent),
    ),
  )
    // now that all promises are done, we can update the parent component
    // state and render the app with all of the blocks loaded

    .then(mapPromises)
    .then(stateUpdater);

export const newLifecycle = (
  dynamicBlockLoader: IDynamicImport,
  dynamicLayoutLoader: IDynamicImport,
  importFunc: IDynamicallyImport = dynamicallyImportComponent,
) =>
  lifecycle({
    componentDidMount() {
      importFunc(
        dynamicBlockLoader,
        dynamicLayoutLoader,
        this.props.load,
        this.props.registry,
        recombineLoadedComponent,
      );
    },
  });
