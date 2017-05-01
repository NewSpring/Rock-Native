// flow-typed signature: e7a824f2288c8af8e1527ab21ee67d47
// flow-typed version: 53afdde167/react-router-native_v4.x.x/flow_>=v0.38.x

declare module 'react-router-native' {
  declare export type GetUserConfirmation =
    (message: string, callback: (confirmed: boolean) => void) => void

  declare type LocationShape = {
    pathname?: string,
    search?: string,
    hash?: string,
    state?: any,
  }

  declare export class NativeRouter extends React$Component {
    props: {
      getUserConfirmation?: GetUserConfirmation,
      keyLength?: number,
      children?: React$Element<*>,
    }
  }

  declare export class Link extends React$Component {
    props: {
      to: string | LocationShape,
      replace?: boolean,
      children?: React$Element<*>,
    }
  }

  declare export class DeepLinking extends React$Component {}

  declare export class AndroidBackButton extends React$Component {}
}
