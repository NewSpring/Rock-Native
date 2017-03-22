# Dune
The future

# Installing

- run `yarn` to install project dependencies
- If you haven't run a react native project in the past, you may need to do additional setup to run the project in a simulator.
- For setup instructions, go [here](https://facebook.github.io/react-native/docs/getting-started.html).

# Running Locally
## Android

**Mac Users:** If you are trying to run an android emulator and the emulator will not start, make sure you are _not_ running docker for mac.

- You must be currently running a virtual device (or actual device connected to Android Studio). See above instructions if you don't have a virtual device set up.
- run `yarn android` to start the app on the device.

## iOS
`yarn ios`

## tvOS

- Open the xcode project under `ios/`
- Make sure a tvOS simulator is installed in `Preferences > Components`
- To run on a tvOS simulator, click `dune` on the top bar next to the play and stop buttons.
- Choose dune-tvOS as your target, and choose an appropriate simulator.
- Click play in XCode.
