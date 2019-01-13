global.unexpected = require("unexpected").clone();
global.unexpected.output.preferredWidth = 80;
global.unexpected.use(require("unexpected-dom"));
global.unexpectedReact = require("../src/");
global.unexpected.use(global.unexpectedReact);

global.unexpected
  .addAssertion("<any> to match snapshot", (expect, subject) => {
    global.expect(subject).toMatchSnapshot();
  })
  .addAssertion(
    "<function> with error matching snapshot",
    (expect, subject) => {
      return expect
        .promise(() => subject())
        .then(
          () => expect.fail(),
          error => {
            if (error && error._isUnexpected) {
              expect(
                error.getErrorMessage("text").toString(),
                "to match snapshot"
              );
            } else {
              expect(error.message, "to match snapshot");
            }
          }
        );
    }
  );

global.unexpected.output.preferredWidth = 80;

module.exports = global.unexpected;
