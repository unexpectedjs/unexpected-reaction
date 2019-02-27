const React = require("react");
const PropTypes = require("prop-types");

const expect = require("../unexpected-with-plugins");
const { Ignore, mount, simulate, unmount } = require("../../src/");

module.exports = {
  React,
  Component: React.Component,
  PropTypes,
  Ignore,
  expect,
  mount,
  unmount,
  simulate
};
