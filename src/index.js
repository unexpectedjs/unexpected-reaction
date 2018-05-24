const { mount, Simulate } = require("react-dom-testing");

module.exports = {
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

        []
          .concat(value)
          .map(event => (typeof event === "string" ? { type: event } : event))
          .forEach(event => {
            let target = subject;

            if (event.target) {
              expect(subject, "to contain elements matching", event.target);
              target = subject.querySelector(event.target);
            }

            if (event.type === "change" && typeof event.value === "string") {
              target.value = event.value;
            }

            if (!Simulate[event.type]) {
              expect.fail(
                `Event '${
                  event.type
                }' is not supported by Simulate\nSee https://reactjs.org/docs/events.html#supported-events`
              );
            }

            Simulate[event.type](target, event.data);
          });

        return expect.shift(subject);
      }
    );
  }
};
