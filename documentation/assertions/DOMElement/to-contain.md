Assert that an element contain a given JSX structure.

This assertion just renders the JSX structure and uses
[unexpected-dom](https://unexpected.js.org/unexpected-dom/assertions/DOMNodeList/to-contain/)
to assert that the subject contains a descendant element satisfying the given element.

```js
const React = require("react");

const Hello = ({ children }) => (
  <div>
    <span className="label">Hello</span>
    <span className="fancy-label name">{children}</span>
  </div>
);
```

```js
expect(
  <Hello>Jane Doe</Hello>,
  'when mounted',
  'to contain',
  <span className="fancy-label name">Jane Doe</span>
)
```

The assertion allows you to leave out attributes you don't care about, or ignore
complete sub-trees:

<!-- unexpected-markdown evaluate:false -->

```js
const { Ignore } = require('unexpected-reaction');
```

```js
expect(
  <Hello>Jane Doe</Hello>,
  'when mounted',
  'to contain',
  <span className="name"><Ignore /></span>
)
```

In case of a failure, you will get a nice diff:

```js
expect(
  <Hello>Jane Doe</Hello>,
  'when mounted',
  'to contain',
  <span className="fullname">Jane Doe</span>
)
```

```output
expected
<div>
  <span class="label">Hello</span>
  <span class="fancy-label name">Jane Doe</span>
</div>
to contain <span class="fullname">Jane Doe</span>

<span
  class="fancy-label name" // expected [ 'fancy-label', 'name' ] to contain 'fullname'
>Jane Doe</span>
```

You can also assert that the element has no descendant elements satisfying the
given element:

```js
expect(
  <Hello>Jane Doe</Hello>,
  'when mounted',
  'not to contain',
  <span className="fullname">Jane Doe</span>
);
```
