import React, { Component } from "react";
import PropTypes from "prop-types";

import expect from "./unexpected-with-plugins";
import { mount, Simulate } from "react-dom-testing";

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

          Simulate.click(mounted);

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
  });
});
