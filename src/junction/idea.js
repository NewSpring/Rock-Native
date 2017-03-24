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
  return (f => f(A))(this.__value);
};

// .of :: Applicative Component -> Junction Component
Junction.prototype.of = function(A) {
  return new Junction(A => A);
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
