# Rock-Native
![Rock RMS](https://raw.githubusercontent.com/SparkDevNetwork/Rock/develop/Images/github-banner.png)

Rock RMS is an open source Relationship Management System (RMS) and Application
Framework. While Rock specializes in serving the unique needs of churches it's
useful in a wide range of service industries.  Rock-Native is the native runtime for Rock to run on iOS, Android, Windows, tvOS, and web using technologies including react-native, webpack, apollo, and more.

Our main developer starting point site is [the wiki](https://github.com/NewSpring/Rock-Native/wiki).

## Learn More

[![Greenkeeper badge](https://badges.greenkeeper.io/NewSpring/Rock-Native.svg)](https://greenkeeper.io/)[![codecov](https://codecov.io/gh/NewSpring/Rock-Native/branch/master/graph/badge.svg)](https://codecov.io/gh/NewSpring/Rock-Native)

Jump over to the [Rock website](http://www.rockrms.com/) to find out more. Keep up to date by:

* [Reading our blog](http://www.rockrms.com/Rock/Connect)
* [Following us on Twitter](http://www.twitter.com/therockrms)
* [Liking us on Facebook](http://www.facebook.com/therockrms)
* [Reading the community Q & A](http://www.rockrms.com/Rock/Ask)

## Installing

- Clone the project.
- Run `yarn` to install project dependencies.
- If you haven't run a react native project in the past, you may need to do additional setup to run the project in a simulator.
- For setup instructions, go [here](https://facebook.github.io/react-native/docs/getting-started.html).

## Running Locally
### Android
**Mac Users:** If you are trying to run an android emulator and the emulator will not start, make sure you are _not_ running Docker for Mac. They don't seem to like each other.

- You must first be running a virtual device (or actual device connected to Android Studio) before attempting to start the project. See above instructions if you don't have a virtual device set up.
- run `yarn android` to start the app on the device.

### iOS
- run `yarn ios`

### tvOS
- Open the xcode project under `ios/`.
- Make sure a tvOS simulator is installed in `Preferences > Components`.
- To run on a tvOS simulator, click `rockNative` on the top bar next to the play and stop buttons.
- Choose rockNative-tvOS as your target, and choose an appropriate simulator.
- Click play in XCode.

### Web
- run `yarn web`

## Contributing

For more information about contributing PRs and issues, see our [Contribution Guidelines](https://github.com/NewSpring/Rock-Native/wiki/Contribution-Guidelines).

[Good First PR](https://github.com/NewSpring/Rock-Native/labels/Good%20First%20PR) is a great starting point for people new to this project.

## License

By contributing to Rock-Native, you agree that your contributions will be licensed under our [NewSpring Church Community License Agreement](https://github.com/NewSpring/Rock-Native/wiki/License).
