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

    browsers: ["ChromeHeadless"]
  });
};
