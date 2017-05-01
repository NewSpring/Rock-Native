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

  it("should load page", async () => {
    const title = await driver.getTitle();
    expect(title).toEqual("Awesome counter app");
  });

  it("has data from the server", async () => {
    const elements = await driver.findElements(By.tagName("h4"));
    const text = await elements[0].getText();
    expect(text).toEqual("GraphQL returned hello world with a response of 200");
  });

  it("finds buttons", async () => {
    const elements = await driver.findElements(By.tagName("button"));
    expect(elements.length).toEqual(2);
  });

  it("should find total count", async () => {
    const elements = await driver.findElements(By.tagName("span"));
    const text = await elements[0].getText();
    expect(text).toContain("0");
  });

  it("should identify platform web", async () => {
    const elements = await driver.findElements(By.tagName("span"));
    const text = await elements[0].getText();
    expect(text).toContain("web");
  });

  it("should increment with click on increment button", async () => {
    const [increment] = await driver.findElements(By.tagName("button"));

    increment.click();

    const [count] = await driver.findElements(By.tagName("span"));
    const text = await count.getText();
    expect(text).toContain("1");
  });

  it("should decrement with click on decrement button", async () => {
    const els = await driver.findElements(By.tagName("button"));
    const decrement = els[1];

    decrement.click();

    const [count] = await driver.findElements(By.tagName("span"));
    const text = await count.getText();
    expect(text).toContain("-1");
  });

  it("should allow to be decremented to negative values", async () => {
    const els = await driver.findElements(By.tagName("button"));

    const decrement = els[1];

    decrement.click();
    decrement.click();

    const [count] = await driver.findElements(By.tagName("span"));
    const text = await count.getText();
    expect(text).toContain("-2");
  });

  it("should follow multiple interactions", async () => {
    const [up, down] = await driver.findElements(By.tagName("button"));

    down.click();
    down.click();
    up.click();
    up.click();
    down.click();
    up.click();
    up.click();
    down.click();
    up.click();
    up.click();

    const [count] = await driver.findElements(By.tagName("span"));
    const text = await count.getText();
    expect(text).toContain("2");
  });
});
