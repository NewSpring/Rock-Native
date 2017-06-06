import { withState, lifecycle } from "recompose";
import { isSupported, authenticate } from "./auth";

export const supportsBiometrics = (): Promise<boolean> =>
  isSupported().then(() => true).catch(() => false);

// XXX later: need to save the results of this somewhere
export const authWithBiometrics = (reason?: string) => async () =>
  await authenticate(reason);

/*HOCs for the Auth component to use*/
export const withSupportedState = withState(
  "supportsBiometrics",
  "setSupport",
  false,
);

export const withLifecycle = lifecycle({
  componentDidMount() {
    supportsBiometrics()
      .then(supported => this.props.setSupport(Boolean(supported)))
      .catch(() => this.props.setSupport(false));
  },
});
