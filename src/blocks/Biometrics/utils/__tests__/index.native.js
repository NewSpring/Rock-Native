import {
  supportsBiometrics,
  authWithBiometrics,
  withSupportedState,
  withLifecycle,
} from "../index.native.js";

const FAIL = () => expect(false).toBe(true);

describe("supportsBiometrics", () => {
  it("should return a promise that resolves to boolean", async () => {
    // you'll need to mock auth.isSupported here
    FAIL();
  });
  it("should return false when the promise throws an error", async () => {
    FAIL();
  });
});

describe("authWithBiometrics", () => {
  it("should return a promise that resolves to a boolean", async () => {
    // you'll need to mock auth.authenticate here
    FAIL();
  });
  it("should return false when the promise throws an error", () => {
    FAIL();
  });
});

describe("withSupportedState", () => {
  it("is called with two strings and a default state", () => {
    FAIL();
  });
});

describe("withLifecycle", () => {
  it("is called with an object containing a componentDidMount", () => {
    FAIL();
  });
  it("componentDidMount calls supportsBiometrics", () => {
    // happy mocking :)
    FAIL();
  });
});
