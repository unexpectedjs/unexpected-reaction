global.unexpected = require("unexpected").clone();
global.unexpected.output.preferredWidth = 80;
global.unexpected.use(require("unexpected-dom"));
global.unexpectedReact = require("../src/");
global.unexpected.use(global.unexpectedReact);

if (!global.window) {
  const jsdom = require("jsdom");
  global.window = new jsdom.JSDOM().window;
  global.document = window.document;
}

global.expect = global.unexpected;
global.mount = global.unexpectedReact.mount;
global.simulate = global.unexpectedReact.simulate;
