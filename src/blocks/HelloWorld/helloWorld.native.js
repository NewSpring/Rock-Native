// @flow
import { Text, View } from "react-native";
import React from "react";
import { helloStyle } from "./";
import TouchIdButton from "../Biometrics";

export const HelloWorld = () => (
  <View>
    <Text style={helloStyle.resolve()}>Hello World</Text>
    <TouchIdButton />
  </View>
);
HelloWorld.displayName = "HelloWorld";

export default HelloWorld;
