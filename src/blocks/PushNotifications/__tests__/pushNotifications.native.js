import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import PushNotifications from "../pushNotifications.native.js";

// Mock calls to FCM.
// jest.mock("react-native-fcm");

const generateComponent = additionalProps => (
  <PushNotifications {...additionalProps} />
);

describe("Push Notifications", () => {
  it("should render the Push Notifications component for native", () => {
    const tree = shallow(generateComponent());
    expect(tree).toBeDefined();
    expect(shallowToJson(tree)).toMatchSnapshot();
  });

  it("should call FCM");
});
