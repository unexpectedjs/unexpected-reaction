An assertion to satisfy a DOMElement against a JSX structure.

This assertion just renders the JSX structure and uses
[unexpected-dom](https://unexpected.js.org/unexpected-dom/assertions/DOMNodeList/to-satisfy/)
to compare the structures.

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

```js
expect(
  <Hello>Jane Doe</Hello>,
  'when mounted',
  'to satisfy',
  <div>
    <span className="label">Hello</span>
    &nbsp;
    <span className="name">Jane Doe</span>
  </div>
)
```

The assertion allows you to leave out attributes you don't care about, or ignore
complete sub-trees:

```js
const { Ignore } = require('unexpected-react');

expect(
  <Hello>Jane Doe</Hello>,
  'when mounted',
  'to satisfy',
  <div>
    <Ignore/>
    &nbsp;
    <span>Jane Doe</span>
  </div>
)
```

In case of a failure, you will get a nice diff:

```js
expect(
  <Hello>Jane Doe</Hello>,
  'when mounted',
  'to satisfy',
  <div>
    <Ignore/>
    &nbsp;
    <span className="fullname">Jane Doe</span>
  </div>
)
```

```output
expected
<div>
  <span class="label">Hello</span>
  
  <span class="name">Jane Doe</span>
</div>
to satisfy <div><!-- ignore --><span class="fullname">Jane Doe</span></div>

<div>
  <span class="label">Hello</span>

  <span
    class="name" // expected [ 'name' ] to contain 'fullname'
  >Jane Doe</span>
</div>
```
