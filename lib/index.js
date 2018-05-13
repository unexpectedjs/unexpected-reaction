"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _reactDomTesting = require("react-dom-testing");

var unexpectedReaction = {
  installInto: function installInto(expect) {
    expect.addType({
      name: "ReactElement",
      base: "wrapperObject",
      unwrap: function unwrap(value) {
        return (0, _reactDomTesting.mount)(value);
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
      return expect.shift((0, _reactDomTesting.mount)(subject));
    });

    expect.addAssertion("<DOMElement> to [exhaustively] satisfy <ReactElement>", function (expect, subject, value) {
      expect.errorMode = "bubble";
      return expect(subject, "to [exhaustively] satisfy", (0, _reactDomTesting.mount)(value));
    });
  }
};

exports.default = unexpectedReaction;