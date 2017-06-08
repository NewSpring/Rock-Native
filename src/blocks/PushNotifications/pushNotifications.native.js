// @flow

import React, { Component } from "react";
import { Button } from "react-native";
import FCM from "react-native-fcm";
// import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType} from 'react-native-fcm';
// import { withState, lifecycle } from "recompose";

class PushRequestButton extends Component {
  componentDidMount() {
    // From initial notification probably want some router handlers?
    FCM.getInitialNotification().then(notif => {
      console.log("INITIAL NOTIFICATION", notif); // eslint-disable-line
    });
  }

  requestPermission() {
    FCM.requestPermissions();
    FCM.getFCMToken().then(token => {
      console.log("TOKEN (getFCMToken)", token); // eslint-disable-line
    });
  }

  // this.refreshTokenListener = FCM.on(FCMEvent.RefreshToken, (token) => {
  //     console.log(token)
  //     // fcm token may not be available on first load, catch it here
  // });

  render() {
    return (
      <Button
        onPress={this.requestPermission}
        title={"Allow Push Notifications"}
      />
    );
  }
}

export default PushRequestButton;

// Set Badge on App, only for iOS Make this a Button?
// get Badge number
