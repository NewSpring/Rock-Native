
import NotificationButton from "../pushNotifications.web.js";

it("should be a noop for web", () => {
  expect(NotificationButton()).toEqual(null);
});
