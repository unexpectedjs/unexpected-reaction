module.exports = [
  {
    input: "lib/index.js",
    external: [
      "prismjs",
      "react",
      "react-dom",
      "react-dom/test-utils",
      "unexpected",
      "unexpected-dom"
    ],
    output: {
      file: "unexpected-reaction.js",
      exports: "default",
      name: "unexpectedReaction",
      format: "umd",
      sourcemap: false,
      strict: false,
      globals: {
        prismjs: "Prism",
        react: "React",
        "react-dom": "ReactDOM",
        "react-dom/test-utils": "ReactTestUtils",
        unexpected: "weknowhow.expect",
        "unexpected-dom": "unexpected.dom"
      }
    },
    plugins: [
      require("rollup-plugin-commonjs")(),
      require("rollup-plugin-json")(),
      require("rollup-plugin-node-resolve")(),
      require("rollup-plugin-node-globals")()
    ]
  }
];
