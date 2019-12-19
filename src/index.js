const React = require("react");

const {
  Ignore,
  act,
  mount,
  simulate: originalSimulate,
  unmount
} = require("react-dom-testing");

const unexpectedDom = require("unexpected-dom");
const magicpenPrism = require("magicpen-prism");
const expect = require("unexpected")
  .clone()
  .use(unexpectedDom)
  .use(magicpenPrism);

function simulateWithExpect(expect, rootElement, events) {
  [].concat(events).forEach(event => {
    if (typeof event.target === "string") {
      expect(rootElement, "to contain elements matching", event.target);
    }

    try {
      originalSimulate(rootElement, event);
    } catch (err) {
      expect.fail(err.message);
    }
  });
}

function simulate(rootElement, events) {
  if (arguments.length !== 2) {
    expect.fail("simulate takes exactly two arguments: {0}", arguments);
  }

  expect.withError(
    () => {
      simulateWithExpect(expect, rootElement, events);
    },
    err => {
      expect.fail(output => {
        output
          .jsFunctionName("simulate")
          .text("(element, ")
          .appendInspected(events)
          .text(")")
          .nl()
          .indentLines()
          .i()
          .block(output => {
            output.appendErrorMessage(err);
          });
      });
    }
  );
}

const unexpectedReaction = {
  name: "unexpected-reaction",
  installInto: expect => {
    expect.addType({
      name: "ReactElement",
      base: "wrapperObject",
      unwrap: value => mount(value),
      prefix: output => output,
      suffix: output => output,
      identify: value => React.isValidElement(value)
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
      "<DOMElement> [not] to contain <ReactElement>",
      (expect, subject, value) => {
        expect.errorMode = "bubble";
        return expect(subject, "[not] to contain", mount(value));
      }
    );

    expect.addAssertion(
      "<DOMElement> with (event|events) <array|object|string> <assertion?>",
      (expect, subject, events) => {
        expect.errorMode = "nested";

        simulateWithExpect(expect, subject, events);

        return expect.shift(subject);
      }
    );
  }
};

unexpectedReaction.act = act;
unexpectedReaction.Ignore = Ignore;
unexpectedReaction.mount = mount;
unexpectedReaction.unmount = unmount;
unexpectedReaction.simulate = simulate;

module.exports = unexpectedReaction;
