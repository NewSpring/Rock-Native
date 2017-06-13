// @flow

import Analytics from "../index";
import {
  trackEvent,
  trackPageView,
  trackScreenView,
  trackTransaction,
} from "../ua";

jest.mock("../ua.js");

const callAnalytics = (type, payload) => {
  const propObject = {
    type,
    payload,
  };
  Analytics(propObject);
};

describe("Analytics", () => {
  it("calls trackEvent if the type is EVENT", () => {
    const type = "EVENT";
    const payload = {
      title: "Event Title",
    };
    callAnalytics(type, payload);
    expect(trackEvent).toHaveBeenCalled();
  });
  it("calls trackPageView if the type is PAGEVIEW", () => {
    const type = "PAGEVIEW";
    const payload = {
      title: "Page View Title",
    };
    callAnalytics(type, payload);
    expect(trackPageView).toHaveBeenCalled();
  });
  it("calls trackScreenView if the type is SCREENVIEW", () => {
    const type = "SCREENVIEW";
    const payload = {
      title: "Screen View Title",
    };
    callAnalytics(type, payload);
    expect(trackScreenView).toHaveBeenCalled();
  });
  it("calls trackTransaction if the type is TRANSACTION", () => {
    const type = "TRANSACTION";
    const payload = {
      title: "Transaction Title",
      total: 100000,
      transactionItems: [
        {
          totalPrice: 5,
          quantity: 6,
          sku: "ABC123",
          name: "Apple vs. Microsoft. Who wins?",
          variation: "Neither of them.",
        },
      ],
    };
    callAnalytics(type, payload);
    expect(trackTransaction).toHaveBeenCalled();
  });
});
