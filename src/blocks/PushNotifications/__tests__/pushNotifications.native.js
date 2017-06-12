import { shallow } from "enzyme";
import React from "react";
import renderer from "react-test-renderer";
import { shallowToJson } from "enzyme-to-json";
import PushNotifications, {
  withLifeCycle,
  requestPermission,
  PushRequestButton,
} from "../pushNotifications.native.js";
import FCM from "react-native-fcm";

const generateComponent = additionalProps => (
  <PushNotifications {...additionalProps} />
);

describe("withLifeCycle", () => {
  it("should call fcm on mount", () => {
    FCM.getInitialNotification = jest.fn(() => Promise.resolve());
    const NoOp = () => null;
    NoOp.displayName = "NoOp";
    const Tester = withLifeCycle(FCM)(NoOp);
    renderer.create(<Tester />);
    expect(FCM.getInitialNotification).toBeCalled();
  });
});

describe("requestPermission", () => {
  it("should call fcm methods when fired", () => {
    const testFCM = {
      requestPermissions: jest.fn(() => Promise.resolve()),
      getFCMToken: jest.fn(() => Promise.resolve()),
    };
    requestPermission(testFCM)();
    expect(testFCM.requestPermissions).toBeCalled();
    expect(testFCM.getFCMToken).toBeCalled();
  });
});

describe("PushRequestButton", () => {
  it("should call FCM methods on button press", () => {
    FCM.requestPermissions = jest.fn(() => Promise.resolve());
    FCM.getFCMToken = jest.fn(() => Promise.resolve());
    const tree = shallow(<PushRequestButton />);
    tree.simulate("press");
    expect(FCM.requestPermissions).toBeCalled();
    expect(FCM.getFCMToken).toBeCalled();
  });
});

describe("Default Exported Button", () => {
  it("should render the Push Notifications component for native", () => {
    const tree = shallow(generateComponent());
    expect(tree).toBeDefined();
    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it("should call getInitialNotification in lifecycle methods", () => {
    FCM.getInitialNotification = jest.fn(() => Promise.resolve());
    const tree = renderer.create(generateComponent());
    expect(tree).toBeDefined();
    expect(FCM.getInitialNotification).toBeCalled();
  });

  it("should call FCM methods on button press", () => {
    FCM.requestPermissions = jest.fn(() => Promise.resolve());
    FCM.getFCMToken = jest.fn(() => Promise.resolve());
    const tree = shallow(generateComponent());
    tree.simulate("press");
    expect(FCM.requestPermissions).toBeCalled();
    expect(FCM.getFCMToken).toBeCalled();
  });
});
