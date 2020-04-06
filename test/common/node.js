const React = require("react");
const PropTypes = require("prop-types");

const expect = require("../unexpected-with-plugins");
const { act, Ignore, mount, simulate, unmount } = require("../../src/");

module.exports = {
  React,
  Component: React.Component,
  PropTypes,
  act,
  Ignore,
  expect,
  mount,
  unmount,
  simulate,
};
