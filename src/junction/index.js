// React native imports (not overwritten)
import { View, Platform } from "react-native";

// Custom wrappers
import Heading, { H1, H2, H3, H4, H5, H6 } from "./components/Heading";
import Hr from "./components/Hr";
import Text, { BlockQuote, Small, P } from "./components/Text";
import Button from "./components/Button";

// import Junction from "~/junction";
// import { Text, View, Platform, Button } from "react-native";
// import { withState, withHandlers, recompose } from "recompose";

// export const state = withState(
//   "counter",
//   "setCounter",
//   ({ defaultValue }) => defaultValue,
// );

// export const actions = withHandlers({
//   increment: ({ setCounter }) => () => setCounter(n => n + 1),
//   decrement: ({ setCounter }) => () => setCounter(n => n - 1),
// });

// export const Counter = ({ increment, counter, decrement }) => (
//   <View>
//     <Text>Counter is at {counter} on {Platform.OS}</Text>
//     <Button onPress={increment}>Increment</Button>
//     <Button onPress={decrement}>Decrement</Button>
//   </View>
// );

// export default Junction()
//   .with(state)
//   .with(actions)
//   .render(Comp)

function Junction(f = A => A) {
  if (!(this instanceof Junction)) return new Junction(f);
  this.__value = f;
  return this;
}

Junction.prototype.render = function(A) {
  return this.__value(A);
};

// .of :: Applicative Component -> Junction Component
Junction.prototype.of = function(A) {
  return new Junction(() => A);
};
Junction.of = Junction.prototype.of;

// #map :: Function Junction => Junction a ~> (a -> b) -> Junction b
Junction.prototype.map = function(f) {
  return new Junction(f(this.__value));
};

// #with ::
Junction.prototype.with = function(f) {
  return this.map(g => A => g(f(A)));
};

export default Junction;

export {
  Heading,
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  Hr,
  Text,
  BlockQuote,
  Small,
  P,
  Button,
  View,
  Platform,
};
