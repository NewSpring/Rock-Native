// @flow
import { Platform } from "react-native";
import DeviceInfo from "react-native-device-info";

export const bundleId = () => DeviceInfo.getBundleId();
export const platform = () => Platform.OS;
export const version = () => DeviceInfo.getVersion();
