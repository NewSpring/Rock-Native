import Driver from "../test-utils/WebDriver";

const { By } = Driver.utils;
const driver = Driver.create();

describe("counter", () => {
  beforeEach(() => {
    driver.get("http://localhost:3000");
  });
  afterAll(() => {
    driver.quit();
  });

  it("should load page", () => {
    return driver.getTitle().then(x => {
      expect(x).toEqual("Awesome counter app");
    });
  });
  it("finds buttons", async () => {
    await driver.findElements(By.tagName("button")).then(elements => {
      expect(elements.length).toEqual(2);
    });
  });
  it("should find total count", async () => {
    await driver.findElements(By.tagName("span")).then(elements => {
      return elements[0].getText().then(text => expect(text).toContain("0"));
    });
  });
  it("should identify platform web", async () => {
    await driver.findElements(By.tagName("span")).then(elements => {
      return elements[0].getText().then(text => expect(text).toContain("web"));
    });
  });
  it("should increment with click on increment button", async () => {
    await driver.findElements(By.tagName("button")).then(els => {
      return els[0].click();
    });
    await driver.findElements(By.tagName("span")).then(elements => {
      return elements[0].getText().then(text => expect(text).toContain("1"));
    });
  });
  it("should decrement with click on decrement button", async () => {
    await driver.findElements(By.tagName("button")).then(els => {
      return els[1].click();
    });
    await driver.findElements(By.tagName("span")).then(elements => {
      return elements[0].getText().then(text => expect(text).toContain("-1"));
    });
  });
  it("should allow to be decremented to negative values", async () => {
    await driver.findElements(By.tagName("button")).then(els => {
      els[1].click();
      els[1].click();
    });
    await driver.findElements(By.tagName("span")).then(elements => {
      return elements[0].getText().then(text => expect(text).toContain("-2"));
    });
  });
  it("should follow multiple interactions", async () => {
    await driver.findElements(By.tagName("button")).then(els => {
      els[1].click();
      els[1].click();
      els[0].click();
      els[0].click();
      els[1].click();
      els[0].click();
      els[0].click();
      els[1].click();
      els[0].click();
      els[0].click();
    });
    await driver.findElements(By.tagName("span")).then(elements => {
      return elements[0].getText().then(text => expect(text).toContain("2"));
    });
  });
});
