An assertion that will issue one or more events on the given element and forward
it to the next assertion.

You can either provide a single event or an array of events that should be
triggers on the component. An event have the following form:

```js#evaluate:false
{
  type: 'change', // The event type
  value: 'My value', // will be set on target when specified
  target: 'input', // an optinal CSS selector specifying the target
}
```

You can also specify event data for
[Simulate](https://reactjs.org/docs/test-utils.html#simulate):

```js#evaluate:false
{
  type: "keyDown",
  target: "input",
  data: {
    keyCode: 13
  }
}
```

If you don't specify a target, the event will be issued on the root element of
the given component.

I case you just want to specify the type, you can just give a string instead of
an event object:

```js
const React = require("react");
expect = unexpected.use(require("unexpected-sinon"));
const sinon = require("sinon");

let onClick = sinon.spy();

expect(
  <button onClick={onClick}>Click me!</button>,
  'when mounted',
  'with event', 'click'
);

expect(onClick, 'to have calls satisfying', () => {
  onClick(expect.it('to satisfy', {type: 'click'}))
});
```

Let's use a login form for the example:

```js
class LoginForm extends React.Component {
  constructor(props) {
    super();

    this.state = {
      username: "",
      password: "",
      showValidation: false
    };

    this.onUsernameChange = e => {
      this.setState({ username: e.target.value, showValidation: false });
    };

    this.onPasswordChange = e => {
      this.setState({ password: e.target.value, showValidation: false });
    };

    this.onSubmit = () => {
      const { username, password } = this.state;
      if (username && password.length >= 8) {
        props.onSubmit({ username, password });
      } else {
        this.setState({ showValidation: true });
      }
    };
  }

  render() {
    const { password, showValidation, username } = this.state;
    
    return (
      <form data-test-id="login">
        <fieldset>
          <label htmlFor="username">Username:</label>
          <input
            name="username"
            onChange={this.onUsernameChange}
            value={username}
          />
          {showValidation &&
            !username && (
              <span className="validation">Username is required.</span>
            )}
        </fieldset>
        <fieldset>
          <label htmlFor="password">Password:</label>
          <input
            name="password"
            type="password"
            onChange={this.onPasswordChange}
            value={password}
          />
          {showValidation &&
            password.length < 8 && (
              <span className="validation">
                Password must be at least 8 characters.
              </span>
            )}
        </fieldset>
        <button onClick={this.onSubmit}>Login</button>
      </form>
    );
  }
}
```

Let's start by checking that we can successfully submit the form.

We will use [sinon](https://sinonjs.org/) and
[unexpected-sinon](http://unexpected.js.org/unexpected-sinon/) to spy on the
submit function.

Then we will use the `with events` assertion to fill out the username and
password and click on the submit button.

Finally we will check that the `onSubmit` function was called with the expected values.

```js
let onSubmit = sinon.spy();

expect(
  <LoginForm onSubmit={onSubmit} />,
  "when mounted",
  "with events", [
    {
      type: "change",
      target: "[name=username]",
      value: "Sune Simonsen"
    },
    {
      type: "change",
      target: "[name=password]",
      value: "Secret..."
    },
    {
      type: "click",
      target: "button"
    }
  ]
);

expect(onSubmit, "to have calls satisfying", () => {
  onSubmit({ username: 'Sune Simonsen', password: 'Secret...' });
});
```

Let's see that we get a validations messages if we submit the form without
entering any data:

```js
onSubmit = sinon.spy()

expect(
  <LoginForm onSubmit={onSubmit} />,
  "when mounted",
  "with event", {
    type: "click",
    target: "button"
  },
  'queried for', '.validation',
  'to satisfy', [
    <span>Username is required.</span>,
    <span>Password must be at least 8 characters.</span>
  ]
);

expect(onSubmit, "was not called");
```
