// @flow
import auth from "react-native-touch-id";
import React from "react";
import { Button } from "react-native";
import { withState, lifecycle } from "recompose";

export const supportsBiometrics = (): Promise<boolean> =>
  auth.isSupported().then(() => true).catch(() => false);

// XXX later: need to save the results of this somewhere
export const authWithBiometrics = (reason: string) => async () =>
  await auth.authenticate(reason);

/*HOCs for the auth components to use*/

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

const UnwrappedAuth = ({
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
