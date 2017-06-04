// @flow
import React from "react";
import { Button } from "react-native";
import { withState, lifecycle } from "recompose";

// XXX will load the platform-specific utils
import auth from "./biometrics";

// XXX the platform-agnostic auth methods
export const supportsBiometrics = (): Promise<boolean> =>
  auth.isSupported().then(() => true).catch(() => false);

// XXX later: need to save the results of this somewhere
export const authWithBiometrics = (reason?: string) => async () =>
  await auth.authenticate(reason);

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

export const UnwrappedAuth = ({
  supportsBiometrics,
}: {
  supportsBiometrics: boolean,
}) =>
  supportsBiometrics
    ? <Button
        title="Authenticate"
        onPress={authWithBiometrics("login to Rock")}
      />
    : null;

export const Auth = withSupportedState(withLifecycle(UnwrappedAuth));
export default Auth;
