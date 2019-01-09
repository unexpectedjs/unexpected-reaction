import React, { Component } from "react";
import PropTypes from "prop-types";

import expect from "./unexpected-with-plugins";
import { mount, simulate } from "../src/";

class Hello extends Component {
  render() {
    const { children, ...other } = this.props;

    return (
      <div {...other}>
        <div className="label">Hello:</div>
        <div className="value" data-test="value">
          {children}
        </div>
      </div>
    );
  }
}

Hello.propTypes = {
  children: PropTypes.node.isRequired
};

const Stateless = ({ className, children }) => (
  <Hello className={className}>{children}</Hello>
);

Stateless.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

class Toggle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checked: false
    };

    this.onClick = () => {
      this.setState(state => ({
        checked: !state.checked
      }));
    };
  }

  render() {
    const { checked } = this.state;

    return (
      <div onClick={this.onClick}>
        {checked && <span style={{ color: "green" }}>TRUE</span>}
        {!checked && <span style={{ color: "red" }}>FALSE</span>}
      </div>
    );
  }
}

class MyInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "",
      selected: ""
    };

    this.onKeyDown = data => {
      if (data.keyCode === 13) {
        // Enter
        this.setState(state => ({
          value: "",
          selected: state.value
        }));
      }
    };

    this.onChange = data => {
      this.setState({
        value: data.target.value
      });
    };
  }

  render() {
    return (
      <fieldset>
        <label htmlFor="name">Enter your name:</label>
        <input
          type="input"
          name="name"
          value={this.state.value}
          onChange={this.onChange}
          onKeyDown={this.onKeyDown}
        />
        <span data-test="name">{this.state.selected}</span>
      </fieldset>
    );
  }
}

describe("unexpected-reaction", () => {
  describe("ReactElement", () => {
    describe("when mounted", () => {
      it("renders the given component into the DOM and forwards the node to the next assertion", () => {
        expect(
          <Hello>Jane Doe</Hello>,
          "when mounted",
          "queried for first",
          "[data-test=value]",
          "to have text",
          "Jane Doe"
        );
      });

      describe("on a stateless component", () => {
        it("renders the given component into the DOM and forwards the node to the next assertion", () => {
          expect(
            <Stateless className="fancy">I am stateless</Stateless>,
            "when mounted",
            "queried for first",
            "[data-test=value]",
            "to have text",
            "I am stateless"
          );
        });
      });
    });
  });

  describe("DOMElement", () => {
    describe("to satisfy", () => {
      it("mounts the given ReactElement and satisfies the subject against it", () => {
        expect(
          <Hello>Jane Doe</Hello>,
          "when mounted",
          "to satisfy",
          <div>
            <div className="label">Hello:</div>
            <div>Jane Doe</div>
          </div>
        );
      });

      it("fails with a diff", () => {
        expect(() => {
          expect(
            <Hello>Jane Doe</Hello>,
            "when mounted",
            "to satisfy",
            <div>
              <div className="label">Hello:</div>
              <div>Jane Doe!</div>
            </div>
          );
        }, "with error matching snapshot");
      });

      describe("on conditional tree", () => {
        it("mounts the given ReactElement and satisfies the subject against it", () => {
          const mounted = mount(<Toggle />);

          expect(
            mounted,
            "to satisfy",
            <div>
              <span>FALSE</span>
            </div>
          );

          simulate(mounted, "click");

          expect(
            mounted,
            "to satisfy",
            <div>
              <span>TRUE</span>
            </div>
          );
        });
      });
    });

    describe("to exhaustivily satisfy", () => {
      it("mounts the given ReactElement and satisfies the subject against it", () => {
        expect(
          <Hello data-test-id="hello">Jane Doe</Hello>,
          "when mounted",
          "to exhaustively satisfy",
          <div data-test-id="hello">
            <div className="label">Hello:</div>
            <div className="value" data-test="value">
              Jane Doe
            </div>
          </div>
        );
      });

      it("fails with a diff", () => {
        expect(() => {
          expect(
            <Hello data-test-id="hello">Jane Doe</Hello>,
            "when mounted",
            "to exhaustively satisfy",
            <div>
              <div className="label">Hello:</div>
              <div className="value" data-test="value">
                Jane Doe
              </div>
            </div>
          );
        }, "with error matching snapshot");
      });
    });

    describe("with event", () => {
      describe("when given a string", () => {
        it("invokes the given event type on the subject", () => {
          expect(
            <Toggle />,
            "when mounted",
            "with event",
            "click",
            "to have text",
            "TRUE"
          );
        });
      });

      describe("when given an object", () => {
        expect(
          <MyInput />,
          "when mounted",
          "with event",
          {
            type: "change",
            value: "Jane Doe",
            target: "input"
          },
          "queried for first",
          "input",
          "to have attribute",
          {
            value: "Jane Doe"
          }
        );
      });

      describe("when given an array", () => {
        it("applies all of the events", () => {
          expect(
            <MyInput />,
            "when mounted",
            "with events",
            [
              {
                type: "change",
                value: "Jane Doe",
                target: "input"
              },
              {
                type: "keyDown",
                target: "input",
                data: {
                  keyCode: 13
                }
              }
            ],
            "queried for first",
            "[data-test=name]",
            "to have text",
            "Jane Doe"
          );
        });

        it("accepts string and object events", () => {
          expect(
            <Toggle />,
            "when mounted",
            "with events",
            ["click", { type: "click" }],
            "to have text",
            "FALSE"
          );
        });
      });

      it("fails if it cant find the event target", () => {
        expect(() => {
          expect(
            <Toggle />,
            "when mounted",
            "with event",
            { type: "click", target: ".foobar" },
            "to have text",
            "TRUE"
          );
        }, "with error matching snapshot");
      });

      it("fails if the event type is not known", () => {
        expect(() => {
          expect(
            <Toggle />,
            "when mounted",
            "with event",
            "press",
            "to have text",
            "TRUE"
          );
        }, "with error matching snapshot");
      });
    });
  });
});
