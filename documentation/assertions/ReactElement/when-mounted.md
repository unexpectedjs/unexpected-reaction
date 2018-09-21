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

Now we can mount it using the assertion and assert that I has the correct text using an [unexpected-dom assertion](https://munter.github.io/unexpected-dom/assertions/DOMElement/to-have-text/):

```js
expect(
  <Hello>Jane Doe</Hello>,
  'when mounted',
  'to have text', 'Hello Jane Doe'
);
```

This is similar to using
[react-dom-testing](https://github.com/sunesimonsen/react-dom-testing/) the
following way:

```js
const { mount } = require('react-dom-testing');

expect(
  mount(<Hello>Jane Doe</Hello>),
  'to have text', 'Hello Jane Doe'
);
```

