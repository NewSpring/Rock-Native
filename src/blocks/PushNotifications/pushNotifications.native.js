// @flow

import React, { Component } from "react";
import { Button } from "react-native";
import FCM from "react-native-fcm";
import { lifecycle } from "recompose";
// import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType} from 'react-native-fcm';
// import { withState, lifecycle } from "recompose";

export const withLifeCycle = (FCM) => lifecycle({
  componentDidMount() {
    // From initial notification probably want some router handlers?
    FCM.getInitialNotification().then(notif => {
      console.log("INITIAL NOTIFICATION", notif); // eslint-disable-line
    });
  }
});

export const requestPermission = (FCM) => () => {
  FCM.requestPermissions();
  FCM.getFCMToken().then(token => {
    console.log("TOKEN (getFCMToken)", token); // eslint-disable-line
  });
}

export const PushRequestButton = () =>
  <Button onPress={requestPermission(FCM)} title="Allow Push Notifications"/>

const PushRequestButtonWithLifecycle = withLifeCycle(FCM)(PushRequestButton)
PushRequestButtonWithLifecycle.displayName = "PushNotificationRequestButton";

export default PushRequestButtonWithLifecycle;

// Set Badge on App, only for iOS Make this a Button?
// get Badge number
