window.testGlobals = {
  React: window.React,
  Component: window.React.Component,
  PropTypes: window.PropTypes,
  expect: window.weknowhow.expect
    .clone()
    .use(window.unexpected.dom)
    .use(window.unexpectedReaction),
  mount: window.unexpectedReaction.mount,
  simulate: window.unexpectedReaction.simulate
};
