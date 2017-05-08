import type { Component } from "react";

export type IBlockDescription = {
  path: string,
  Component?: Component,
};

export type IRegistryRequest = {
  layout: string,
  blocks: IBlockDescription[],
};

export type IState = {
  components: IBlockDescription[],
};

export type IRegistryProps = {
  registry: IRegistryRequest,
};
