---
title: unexpected-reaction
template: default.ejs
theme: light
repository: https://github.com/unexpectedjs/unexpected-reaction
---

# unexpected-reaction

An Unexpected plugin to make React testing with [unexpected-dom](https://unexpected.js.org/unexpected-dom/) more convenient.

![unexpected-reaction](https://media.giphy.com/media/l46CwgcMQr6Si3uGk/giphy.gif)

[![NPM version](https://badge.fury.io/js/unexpected-reaction.svg)](http://badge.fury.io/js/unexpected-reaction)
[![Build Status](https://travis-ci.org/unexpectedjs/unexpected-reaction.svg?branch=master)](https://travis-ci.org/unexpectedjs/unexpected-reaction)

## Installation

Install it with NPM or add it to your `package.json`:

```
$ npm install --save-dev unexpected unexpected-dom unexpected-reaction
```

Then:

<!-- unexpected-markdown evaluate:false -->

```js
var expect = require("unexpected").clone();
expect.use(require("unexpected-dom"));
expect.use(require("unexpected-reaction"));
```

## Usage

```js
const React = require("react");

const Hello = ({ children }) => (
  <div>
    <span className="label">Hello</span>
    &nbsp;
    <span className="name">{children}</span>
  </div>
);
```

Use it to mount a component into the DOM and assert on the rendered output:

```js
expect(
  <Hello>Jane Doe</Hello>,
  "when mounted",
  "queried for first",
  ".name",
  "to have text",
  "Jane Doe"
);
```

You can also satisfy a mounted component against a JSX structure. This will
mount the JSX structure into the DOM and compare the mounted component under test with
the DOM rendered by the given JSX structure. The comparison will use
`to satisfy` from [unexpected-dom](https://unexpected.js.org/unexpected-dom/assertions/DOMElement/to-satisfy/).

```js
expect(
  <Hello>Jane Doe</Hello>,
  "when mounted",
  "to satisfy",
  <div>
    <span className="label">Hello</span>
    &nbsp;
    <span className="name">Jane Doe</span>
  </div>
);
```

This is similar to programatically mounting the component and
asserting against the result via [unexpected-dom](https://unexpected.js.org/unexpected-dom/)
in the following way:

<!-- unexpected-markdown evaluate:false -->

```js
const { mount } = require("unexpected-reaction");
```

```js
expect(
  mount(<Hello>Jane Doe</Hello>),
  "to satisfy",
  mount(
    <div>
      <span className="label">Hello</span>
      &nbsp;
      <span className="name">Jane Doe</span>
    </div>
  )
);
```

This library exposes all of the methods from
[react-dom-testing](https://github.com/sunesimonsen/react-dom-testing/)
for convenience.

## MIT License

Copyright (c) 2018 Sune Simonsen <sune@we-knowhow.dk>

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the 'Software'), to deal in the Software without
restriction, including without limitation the rights to use, copy,
modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
