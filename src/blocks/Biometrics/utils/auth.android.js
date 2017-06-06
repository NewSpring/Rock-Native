// @flow

/*
  NOTE: react_native_touch_id_android needs a couple changes to the /android/build.gradle
  and /android/app/src/main/java/com/rocknative/MainApplication.java file. If either of these
  get changed, bad things may happen. Just so you know :)
*/

import auth from "react-native-touch-id-android";

export const isSupported = auth.isSensorAvailable;
export const requestTouch = auth.authenticate;
