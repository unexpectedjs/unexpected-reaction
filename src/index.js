import { mount } from "react-dom-testing";

const unexpectedReaction = {
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
        const mounted = mount(subject);
        mounted.removeAttribute("data-reactroot");
        return expect.shift(mounted);
      }
    );

    expect.addAssertion(
      "<DOMElement> to [exhaustively] satisfy <ReactElement>",
      (expect, subject, value) => {
        expect.errorMode = "bubble";
        const mounted = mount(value);
        mounted.removeAttribute("data-reactroot");
        return expect(subject, "to [exhaustively] satisfy", mounted);
      }
    );
  }
};

export default unexpectedReaction;
