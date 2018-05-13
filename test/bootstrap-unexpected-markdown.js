global.unexpected = require("unexpected").clone();
global.unexpected.output.preferredWidth = 80;
global.unexpected.use(require("unexpected-dom"));
global.unexpected.use(require("../src/"));

const jsdom = require("jsdom");
global.window = new jsdom.JSDOM().window;
global.document = window.document;

global.expect = global.unexpected;
