module.exports = function(config) {
  config.set({
    frameworks: ["mocha"],

    files: [
      "./node_modules/unexpected/unexpected.js",
      "./node_modules/unexpected-dom/unexpected-dom.js",
      "./node_modules/react/umd/react.development.js",
      "./node_modules/react-dom/umd/react-dom.development.js",
      "./node_modules/react-dom/umd/react-dom-test-utils.development.js",
      "./node_modules/prop-types/prop-types.js",
      "./unexpected-reaction.js",
      "./test/common/browser.js",
      "./build/test/index.spec.js"
    ],

    client: {
      mocha: {
        reporter: "html",
        timeout: 60000
      }
    },

    browsers: ["ChromeHeadless", "ie11"],

    browserStack: {
      video: false,
      project:
        process.env.TRAVIS_BRANCH === "master" &&
        !process.env.TRAVIS_PULL_REQUEST_BRANCH // Catch Travis "PR" builds
          ? "unexpected-reaction"
          : "unexpected-reaction-dev"
    },

    customLaunchers: {
      ie11: {
        base: "BrowserStack",
        browser: "IE",
        browser_version: "11",
        os: "Windows",
        os_version: "7"
      }
    },

    reporters: ["dots", "BrowserStack"]
  });
};
