declare module "react-hot-loader" {
  declare function AppContainer(): Function;
}

declare var module: {
  hot: {
    accept(path: string, callback: () => void): void
  }
};
