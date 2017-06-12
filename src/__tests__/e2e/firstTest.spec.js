/* eslint-disable */

/*
 *
 *
 * The following would look something like what we'd need for jest
 * see https://github.com/wix/detox/issues/143
 *
import detox from "detox";
const config = require("../package.json").detox;

beforeAll(async () => {
  await detox.init(config);
});

afterAll(async () => {
  await detox.cleanup();
});
*/

describe("Rock Native End-to-End", () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should say hello world', async () => {
    await expect(element(by.id('mainZone').withDescendant(by.text("Hello World")))).toExist();
  });

  it('should tap increment', async () => {
    await element(by.id('increment')).multiTap(2);
    await expect(element(by.id("counterOutput"))).toHaveText("Counter is at 2 on ios");
  });

  it('should tap decrement', async () => {
    await element(by.id('decrement')).multiTap(3);
    await expect(element(by.id("counterOutput"))).toHaveText("Counter is at -3 on ios");
  });
})
