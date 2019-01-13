module.exports = [
  {
    input: "lib/index.js",
    external: ["react-dom", "react-dom/test-utils"],
    output: {
      file: "unexpected-reaction.js",
      exports: "default",
      name: "unexpectedReaction",
      format: "umd",
      sourcemap: false,
      strict: false,
      globals: {
        "react-dom": "ReactDOM",
        "react-dom/test-utils": "ReactTestUtils"
      }
    },
    plugins: [
      require("rollup-plugin-commonjs")(),
      require("rollup-plugin-node-resolve")(),
      require("rollup-plugin-node-globals")()
    ]
  }
];
