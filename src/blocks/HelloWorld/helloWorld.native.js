// @flow
import { Text, View } from "react-native";
import { Link } from "react-router-native";
import { helloStyle } from "./";

export default props => (
  <Link to={"/hello"} style={helloStyle.resolve()}>
    <Text>Hello World</Text>
  </Link>
);
