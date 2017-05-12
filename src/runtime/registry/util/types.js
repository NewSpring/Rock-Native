import type { Component } from "react";

export type ILayoutProps = {
  zones: { [key: string]: IBlockDescription[] },
  Layout: Component,
};

export type IBlockDescription = {
  path: string,
  order: number,
  zone: string,
  Component?: Component,
};

export type IRegistryRequest = {
  layout: string,
  blocks: IBlockDescription[],
};

export type IState = {
  components: ?(IBlockDescription[]),
  Layout?: Component,
};

export type IRegistryProps = {
  registry: IRegistryRequest,
  imports: IState,
};
