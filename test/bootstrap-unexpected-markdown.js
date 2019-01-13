const { expect, mount, simulate } = require("./common/node");

if (!global.window) {
  const jsdom = require("jsdom");
  global.window = new jsdom.JSDOM().window;
  global.document = window.document;
}

global.unexpected = expect;
global.unexpected.output.preferredWidth = 80;
global.expect = global.unexpected;
global.mount = mount;
global.simulate = simulate;
