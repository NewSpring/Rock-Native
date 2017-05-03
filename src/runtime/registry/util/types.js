export type IBlockDescrpition = {
  path: string,
  Component?: Component,
};

export type IRegistryRequest = {
  blocks: IBlockDescription[],
};

export type IState = {
  components: IBlockDescription[],
};

export type IRegistryProps = {
  registry: IRegistryRequest,
};
