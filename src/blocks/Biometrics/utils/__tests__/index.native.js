/**
 * @jest-environment jsdom
 */
// @flow

import React, { Component } from "react";
import { mount } from "enzyme";
import {
  supportsBiometrics,
  authWithBiometrics,
  withSupportedState,
  // withLifecycle,
} from "../index.native.js";
import type { ISupportedStateProps } from "../index.native.js";

// this should be a manual mock in the __mocks__ directory.
// this isn't working for some reason?
function mockFunctions() {
  const original = require.requireActual("recompose");
  return {
    ...original, //Pass down all the exported objects
    lifecycle: jest.fn(original.lifecycle),
  };
}
jest.mock("recompose", () => mockFunctions());
// import { lifecycle } from "recompose";
// console.log(lifecycle.mock);

import { isSupported, authenticate } from "../auth.ios.js";
jest.mock("../auth.ios.js", () => ({
  isSupported: jest.fn(() => Promise.resolve()),
  authenticate: jest.fn(() => Promise.resolve()),
}));

describe("supportsBiometrics", () => {
  it("should return a promise that resolves to boolean", async () => {
    expect(typeof supportsBiometrics).toBe("function");
    return supportsBiometrics().then(result => {
      expect(typeof result).toEqual("boolean");
    });
  });
  it("should return false when the promise is rejected", async () => {
    isSupported.mockImplementationOnce(() => Promise.reject());
    const supported = await supportsBiometrics();
    expect(supported).toBe(false);
  });
});

describe("authWithBiometrics", () => {
  it("should return a promise that resolves to a boolean", async () => {
    // you'll need to mock auth.authenticate here
    expect(typeof authWithBiometrics).toBe("function");
    return authWithBiometrics("because").then(result => {
      expect(typeof result).toEqual("boolean");
    });
  });
  it("should return false when the promise throws an error", async () => {
    authenticate.mockImplementationOnce(() => Promise.reject());
    const authed = await authWithBiometrics("because");
    expect(authed).toBe(false);
  });
});

describe("withSupportedState", () => {
  it("has a default value for supporting Biometrics", done => {
    class Test extends Component {
      props: ISupportedStateProps;
      constructor(props) {
        super(props);
        expect(props.supportsBiometrics).toEqual(false);
        done();
      }

      render() {
        return null;
      }
    }
    const TestWithState = withSupportedState(Test);
    mount(<TestWithState />);
  });

  it("has an updater function which rerenders component on change", done => {
    class Test extends Component {
      props: ISupportedStateProps;
      constructor(props) {
        super(props);
        expect(props.supportsBiometrics).toEqual(false);
      }

      componentDidMount() {
        this.props.setSupport(true);
      }

      componentWillReceiveProps(nextProps) {
        expect(nextProps.supportsBiometrics).toEqual(true);
        expect(this.props.supportsBiometrics).toEqual(false);
        done();
      }

      render() {
        return null;
      }
    }
    const TestWithState = withSupportedState(Test);
    mount(<TestWithState />);
  });
});

// mocking recompose isn't working for some reason.
xdescribe("withLifecycle", () => {
  it("is called with an object containing a componentDidMount", () => {});
  it("componentDidMount calls supportsBiometrics", () => {
    //   // happy mocking :)
  });
});
