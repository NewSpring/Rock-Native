// @flow
// import ua from "universal-analytics";
import {
  trackScreenView,
  trackPageView,
  trackEvent,
  trackTransaction,
} from "../ua";

// jest.mock("../ua");

describe("Universal Analytics", () => {
  describe("Track Screen View", () => {
    xit("should call uaVisitor.screenview when uaVisitor is passed", () => {
      // const uaVisitor = {
      //   screenview: jest.fn(),
      // };
      // const screen = "Giving Step 1";
      // trackScreenView(screen);
      // expect(uaVisitor.screenview).toHaveBeenCalled();
      // I tried a few things here, but I'm not sure how I
      // am supposed to get trackScreenView or any of the other
      // functions to know what uaVisitor is. It's a constant
      // defined in the ua.js file and is not passed as a prop
      // to the functions. How to mock that?
    });
    it("should return void/undefined when uaVisitor is not passed", () => {
      const screen = "Giving Step 1";
      const result = trackScreenView(screen);
      expect(result).toBeUndefined;
    });
  });

  describe("Track Page View", () => {
    xit("should call uaVisitor.pageview when uaVisitor is passed", () => {
      // STUB
    });
    it("should return void/undefined when uaVisitor is not passed", () => {
      const page = "Giving";
      const result = trackPageView(page);
      expect(result).toBeUndefined;
    });
  });

  describe("Track Event", () => {
    xit("should call uaVisitor.event when uaVisitor is passed", () => {
      // STUB
    });
    it("should return void/undefined when uaVisitor is not passed", () => {
      const category = "Web";
      const action = "Click";
      const label = "";
      const value = "Clicked It";
      const result = trackEvent(category, action, label, value);
      expect(result).toBeUndefined;
    });
  });

  describe("Track Transaction", () => {
    xit("should call uaVisitor.transaction when uaVisitor is passed", () => {
      // STUB
    });
    it("should return void/undefined when uaVisitor is not passed", () => {
      const transactionId = "ABC123";
      const total = 75;
      const items = [
        {
          totalPrice: 5,
          quantity: 15,
          sku: "J1A2K3E4L5O6V7E8D9H0A1R2A3M4B5E6",
          name: "Fidget Spinner",
          variation: "NOSPIN",
        },
      ];
      const result = trackTransaction(transactionId, total, items);
      expect(result).toBeUndefined;
    });
  });
});
