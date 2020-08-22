// eslint-disable-next-line import/no-extraneous-dependencies
const babelCore = require("babel-core");
const fs = require("fs");
const path = require("path");

const babelConfig = JSON.parse(
  fs.readFileSync(path.join(__dirname, ".babelrc"))
);

module.exports = {
  commentMarker: "unexpected-markdown",
  require: "./test/bootstrap-unexpected-markdown.js",
  transpileFn: (code) => babelCore.transform(code, babelConfig).code,
};
