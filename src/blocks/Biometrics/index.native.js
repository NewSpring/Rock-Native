// @flow
import React from "react";
import { Button } from "react-native";
import {
  supportsBiometrics,
  authWithBiometrics,
  withSupportedState,
  withLifecycle,
} from "./utils";

export const BiometricAuthButton = ({
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

BiometricAuthButton.displayName = "BiometricAuthButton";

export default withSupportedState(withLifecycle(BiometricAuthButton));
export { supportsBiometrics, authWithBiometrics };
