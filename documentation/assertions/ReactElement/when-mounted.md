This will assertion will mount the JSX structure into the DOM and forward it to the next assertion.

Let's create a component for the example:

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

Now we can mount it using the assertion and assert that I has the correct text using an [unexpected-dom assertion](https://unexpected.js.org/unexpected-dom/assertions/DOMElement/to-have-text/):

```js
expect(
  <Hello>Jane Doe</Hello>,
  'when mounted',
  'to have text', 'Hello Jane Doe'
);
```

This is similar to the mount function in the following way:

<!-- unexpected-markdown evaluate:false -->

```js
const { mount } = require('unexpected-reaction');
```

```js
expect(
  mount(<Hello>Jane Doe</Hello>),
  'to have text', 'Hello Jane Doe'
);
```

The mount method is provided by
[react-dom-testing](https://github.com/sunesimonsen/react-dom-testing/)
and is exported as a convenience.
