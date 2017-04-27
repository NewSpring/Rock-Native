if (jasmine) jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
import "chromedriver";
import webdriver from "selenium-webdriver";

// FUTURE: See https://www.npmjs.com/package/selenium-standalone for standalone server

// const username = process.env.SAUCE_USERNAME;
// const accessKey = process.env.SAUCE_ACCESS_KEY;

export default {
  create: function(/* env */) {
    // XXX turn back on saucelabs? Maybe?
    // if (process.env.TRAVIS_JOB_NUMBER) {
    //   return new webdriver.Builder()
    //     .withCapabilities({
    //       browserName: "chrome",
    //       version: "56",
    //       "tunnel-identifier": process.env.TRAVIS_JOB_NUMBER,
    //       build: process.env.TRAVIS_BUILD_NUMBER,
    //     })
    //     .usingServer(
    //       "http://" + username + ":" + accessKey + "@localhost:4445/wd/hub",
    //     )
    //     .build();
    // }
    return new webdriver.Builder().forBrowser("chrome").build();
  },
  utils: webdriver,
};
