// @flow
import React from "react";
import { Button } from "react-native";
import {
  supportsBiometrics,
  authWithBiometrics,
  withSupportedState,
  withLifecycle,
} from "./utils";

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
export { supportsBiometrics, authWithBiometrics };
export default Auth;
