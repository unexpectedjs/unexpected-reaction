const { Ignore, mount, simulate } = require("react-dom-testing");

const unexpectedReaction = {
  name: "unexpected-reaction",
  installInto: expect => {
    expect.addType({
      name: "ReactElement",
      base: "wrapperObject",
      unwrap: value => mount(value),
      prefix: output => output,
      suffix: output => output,
      identify: value =>
        typeof value === "object" &&
        value !== null &&
        (typeof value.type === "function" || typeof value.type === "string") &&
        typeof value.hasOwnProperty === "function" &&
        value.hasOwnProperty("props") &&
        value.hasOwnProperty("ref") &&
        value.hasOwnProperty("key")
    });

    expect.addAssertion(
      "<ReactElement> when mounted <assertion>",
      (expect, subject) => {
        expect.errorMode = "bubble";
        return expect.shift(mount(subject));
      }
    );

    expect.addAssertion(
      "<DOMElement> to [exhaustively] satisfy <ReactElement>",
      (expect, subject, value) => {
        expect.errorMode = "bubble";
        return expect(subject, "to [exhaustively] satisfy", mount(value));
      }
    );

    expect.addAssertion(
      "<DOMElement> with (event|events) <array|object|string> <assertion?>",
      (expect, subject, value) => {
        expect.errorMode = "nested";

        [].concat(value).forEach(event => {
          if (typeof event.target === "string") {
            expect(subject, "to contain elements matching", event.target);
          }

          try {
            simulate(subject, event);
          } catch (err) {
            expect.fail(err.message);
          }
        });

        return expect.shift(subject);
      }
    );
  }
};

unexpectedReaction.Ignore = Ignore;
unexpectedReaction.mount = mount;
unexpectedReaction.simulate = simulate;

module.exports = unexpectedReaction;
