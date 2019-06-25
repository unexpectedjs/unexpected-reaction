global.unexpected = require("unexpected").clone();
global.unexpected.output.preferredWidth = 80;
global.unexpected.use(require("unexpected-dom"));
global.unexpected.use(require("unexpected-snapshot"));
global.unexpectedReact = require("../src/");
global.unexpected.use(global.unexpectedReact);

global.unexpected.addAssertion(
  "<function> to error satisfying <assertion>",
  (expect, cb) =>
    expect(cb, "to error").then(err => {
      expect.errorMode = "nested";
      return expect.shift(
        err.isUnexpected ? err.getErrorMessage("text").toString() : err.message
      );
    })
);

global.unexpected.output.preferredWidth = 80;

module.exports = global.unexpected;
