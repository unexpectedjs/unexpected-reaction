(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('react-dom/test-utils'), require('react'), require('react-dom')) :
	typeof define === 'function' && define.amd ? define(['react-dom/test-utils', 'react', 'react-dom'], factory) :
	(global = global || self, global.unexpectedReaction = factory(global.ReactTestUtils, global.React, global.ReactDOM));
}(this, function (testUtils, react, reactDom) {
	testUtils = testUtils && testUtils.hasOwnProperty('default') ? testUtils['default'] : testUtils;
	react = react && react.hasOwnProperty('default') ? react['default'] : react;
	reactDom = reactDom && reactDom.hasOwnProperty('default') ? reactDom['default'] : reactDom;

	function unwrapExports (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var Ignore_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();



	var _react2 = _interopRequireDefault(react);



	var _reactDom2 = _interopRequireDefault(reactDom);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Ignore = function (_Component) {
	  _inherits(Ignore, _Component);

	  function Ignore() {
	    _classCallCheck(this, Ignore);

	    return _possibleConstructorReturn(this, (Ignore.__proto__ || Object.getPrototypeOf(Ignore)).apply(this, arguments));
	  }

	  _createClass(Ignore, [{
	    key: "componentDidMount",
	    value: function componentDidMount() {
	      var el = _reactDom2.default.findDOMNode(this);
	      _reactDom2.default.unmountComponentAtNode(el);
	      el.outerHTML = "<!-- ignore -->";
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      return _react2.default.createElement("div", null);
	    }
	  }]);

	  return Ignore;
	}(react.Component);

	exports.default = Ignore;
	});

	unwrapExports(Ignore_1);

	const indentCache = [''];
	function indent(level) {
	  for (let i = indentCache.length; i < level + 1; i += 1) {
	    indentCache.push(indentCache[i - 1] + ' ');
	  }
	  return indentCache[level];
	}

	var domspace = function domspace(node, indentLevel = 0) {
	  if (
	    node.childNodes.length === 1 &&
	    node.firstChild.nodeType === node.TEXT_NODE
	  ) {
	    node.firstChild.nodeValue = node.firstChild.nodeValue.trim();
	  } else {
	    let nextIndentLevel = indentLevel;
	    if (node.nodeType !== node.DOCUMENT_NODE && node.nodeName !== 'HTML') {
	      nextIndentLevel += 2;
	    }
	    for (let i = 0; i < node.childNodes.length; i += 1) {
	      const childNode = node.childNodes[i];
	      if (childNode.nodeType === node.TEXT_NODE) {
	        if (/^\s*$/.test(childNode.nodeValue)) {
	          node.removeChild(childNode);
	          i -= 1;
	        } else {
	          childNode.nodeValue = childNode.nodeValue
	            .replace(/^\s*/, '\n' + indent(nextIndentLevel))
	            .replace(/(\S)\s*/, '$1');
	        }
	      } else {
	        if (node.nodeType !== node.DOCUMENT_NODE) {
	          node.insertBefore(
	            (node.ownerDocument || node).createTextNode('\n' + indent(nextIndentLevel)),
	            childNode
	          );
	          i += 1;
	        } else if (i > 0) {
	          node.insertBefore(
	            (node.ownerDocument || node).createTextNode('\n'),
	            childNode
	          );
	          i += 1;
	        }
	        domspace(childNode, nextIndentLevel);
	      }
	    }
	    node.appendChild(
	      (node.ownerDocument || node).createTextNode('\n' + indent(indentLevel))
	    );
	  }
	  return node;
	};

	var lib = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Ignore = exports.Simulate = undefined;
	exports.mount = mount;
	exports.unmount = unmount;
	exports.simulate = simulate;



	Object.defineProperty(exports, "Simulate", {
	  enumerable: true,
	  get: function get() {
	    return testUtils.Simulate;
	  }
	});



	Object.defineProperty(exports, "Ignore", {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(Ignore_1).default;
	  }
	});



	var _reactDom2 = _interopRequireDefault(reactDom);



	var _domspace2 = _interopRequireDefault(domspace);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function mount(element) {
	  var container = document.createElement("div");
	  if (testUtils.act) {
	    (0, testUtils.act)(function () {
	      _reactDom2.default.render(element, container);
	    });
	  } else {
	    _reactDom2.default.render(element, container);
	  }

	  return container.firstChild;
	}

	function unmount(element) {
	  _reactDom2.default.unmountComponentAtNode(element.parentNode);
	}

	function simulate(rootElement, events) {
	  if (arguments.length !== 2) {
	    throw new Error("simulate takes exactly two arguments");
	  }

	  [].concat(events).map(function (event) {
	    return typeof event === "string" ? { type: event } : event;
	  }).forEach(function (event) {
	    var target = rootElement;

	    if (!event.type) {
	      throw new Error("All events must have a type");
	    }

	    if (event.target) {
	      target = rootElement.querySelector(event.target);
	      if (!target) {
	        throw new Error("Could not trigger " + event.type + " on '" + event.target + "' in\n" + (0, _domspace2.default)(rootElement.cloneNode(true)).outerHTML);
	      }
	    }

	    if (event.type === "change" && typeof event.value === "string") {
	      target.value = event.value;
	    }

	    if (!testUtils.Simulate[event.type]) {
	      throw new Error("Event '" + event.type + "' is not supported by Simulate\nSee https://reactjs.org/docs/events.html#supported-events");
	    }

	    if (testUtils.act) {
	      (0, testUtils.act)(function () {
	        testUtils.Simulate[event.type](target, event.data);
	      });
	    } else {
	      testUtils.Simulate[event.type](target, event.data);
	    }
	  });
	}
	});

	unwrapExports(lib);
	var lib_1 = lib.Ignore;
	var lib_2 = lib.Simulate;
	var lib_3 = lib.mount;
	var lib_4 = lib.unmount;
	var lib_5 = lib.simulate;

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var Ignore = lib.Ignore,
	    mount = lib.mount,
	    simulate = lib.simulate,
	    unmount = lib.unmount;

	var unexpectedReaction = {
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

	    expect.addAssertion("<DOMElement> [not] to contain <ReactElement>", function (expect, subject, value) {
	      expect.errorMode = "bubble";
	      return expect(subject, "[not] to contain", mount(value));
	    });

	    expect.addAssertion("<DOMElement> with (event|events) <array|object|string> <assertion?>", function (expect, subject, value) {
	      expect.errorMode = "nested";

	      [].concat(value).forEach(function (event) {
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
	    });
	  }
	};

	unexpectedReaction.Ignore = Ignore;
	unexpectedReaction.mount = mount;
	unexpectedReaction.unmount = unmount;
	unexpectedReaction.simulate = simulate;

	var lib$1 = unexpectedReaction;

	return lib$1;

}));
