"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _require = require("react-dom-testing"),
    mount = _require.mount,
    Simulate = _require.Simulate;

module.exports = {
  name: "unexpected-reaction",
  installInto: function installInto(expect) {
    expect.addType({
      name: "ReactElement",
      base: "wrapperObject",
      unwrap: function unwrap(value) {
        return mount(value);
      },
      prefix: function prefix(output) {
        return output;
      },
      suffix: function suffix(output) {
        return output;
      },
      identify: function identify(value) {
        return (typeof value === "undefined" ? "undefined" : _typeof(value)) === "object" && value !== null && (typeof value.type === "function" || typeof value.type === "string") && typeof value.hasOwnProperty === "function" && value.hasOwnProperty("props") && value.hasOwnProperty("ref") && value.hasOwnProperty("key");
      }
    });

    expect.addAssertion("<ReactElement> when mounted <assertion>", function (expect, subject) {
      expect.errorMode = "bubble";
      return expect.shift(mount(subject));
    });

    expect.addAssertion("<DOMElement> to [exhaustively] satisfy <ReactElement>", function (expect, subject, value) {
      expect.errorMode = "bubble";
      return expect(subject, "to [exhaustively] satisfy", mount(value));
    });

    expect.addAssertion("<DOMElement> with (event|events) <array|object|string> <assertion?>", function (expect, subject, value) {
      expect.errorMode = "nested";

      [].concat(value).map(function (event) {
        return typeof event === "string" ? { type: event } : event;
      }).forEach(function (event) {
        var target = subject;

        if (event.target) {
          expect(subject, "to contain elements matching", event.target);
          target = subject.querySelector(event.target);
        }

        if (event.type === "change" && typeof event.value === "string") {
          target.value = event.value;
        }

        if (!Simulate[event.type]) {
          expect.fail("Event '" + event.type + "' is not supported by Simulate\nSee https://reactjs.org/docs/events.html#supported-events");
        }

        Simulate[event.type](target, event.data);
      });

      return expect.shift(subject);
    });
  }
};