process.stdout.columns = 80;

global.unexpected = require("unexpected").clone();
global.unexpected.output.preferredWidth = 80;
global.unexpected.use(require("unexpected-dom"));
global.unexpected.use(require("unexpected-snapshot"));
global.unexpectedReact = require("../src/");
global.unexpected.use(global.unexpectedReact);

global.unexpected.output.preferredWidth = 80;

module.exports = global.unexpected;
