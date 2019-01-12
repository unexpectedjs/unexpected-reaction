---
title: Example
template: default.ejs
theme: light
repository: https://github.com/unexpectedjs/unexpected-reaction
---

In this example I will show you how you can use unexpected-reaction
to test a temperature converter. The example is totally stolen from:
https://reactjs.org/docs/lifting-state-up.html

We start out by building a boiling verdict, that will tell you if water is
boiling for a given Celsius temperature:

```js
const React = require("react");

const BoilingVerdict = ({ celsius }) => (
  <p data-test-id="boiling-verdict">
    {celsius >= 100 ? "The water would boil." : "The water would not boil."}
  </p>
);
```

Let's check that we get boiling water for 100 degrees Celsius:

```js
expect(
  <BoilingVerdict celsius={100} />,
  "when mounted",
  "to have text",
  "The water would boil."
);
```

Let's make sure that we don't get boiling water for 99.9 degrees Celsius:

```js
expect(
  <BoilingVerdict celsius={99.9} />,
  "when mounted",
  "to have text",
  "The water would not boil."
);
```

Notice that you would probably extract these logic methods and test them
separately in a real application. But here I'm just trying to show how you can
test React components.

Now let's create a temperature input, that can accept a temperature in a given scale:

```js
const scaleNames = {
  c: "Celsius",
  f: "Fahrenheit"
};

class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onTemperatureChange(e.target.value);
  }

  render() {
    const { scale, temperature, testId } = this.props;

    return (
      <fieldset>
        <legend>Enter temperature in {scaleNames[scale]}:</legend>
        <input
          data-test-id={testId}
          value={temperature}
          onChange={this.handleChange}
        />
      </fieldset>
    );
  }
}
```

Notice that we add a test id to the input to make it easier to find the input
from tests. We are going to use this functionality later in the example. It is
generally a good practice to use stable identifiers for finding elements as that
will make tests less brittle.

Let's start by testing that the legend displays the scale correctly:

```js
expect(
  <TemperatureInput scale="f" temperature={64} />,
  "when mounted queried for first",
  "legend",
  "to have text",
  "Enter temperature in Fahrenheit:"
);
```

We can also make sure that we get an event with the correct value when the input is
changed. We do that by simulating a change on the input field and check that the
callback is called with the correct value:

```js#evaluate:false
const { mount, simulate } = require("unexpected-reaction");
```

```js
expect.use(require("unexpected-sinon"));
const sinon = require("sinon");

const onChangeSpy = sinon.spy();

const temperatureInput = mount(
  <TemperatureInput
    scale="f"
    temperature={64}
    onTemperatureChange={onChangeSpy}
  />
);

simulate(temperatureInput, {
  type: "change",
  target: "input",
  value: "75"
});

expect(onChangeSpy, "to have calls satisfying", () => {
  onChangeSpy("75");
});
```

Now we have all the parts we need to implement our temperature converter:

```js
const toCelsius = fahrenheit => (fahrenheit - 32) * 5 / 9;
const toFahrenheit = celsius => celsius * 9 / 5 + 32;

function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return "";
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}

class TemperaturCalculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
    this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
    this.state = { temperature: "", scale: "c" };
  }

  handleCelsiusChange(temperature) {
    this.setState({ scale: "c", temperature });
  }

  handleFahrenheitChange(temperature) {
    this.setState({ scale: "f", temperature });
  }

  render() {
    const { scale, temperature } = this.state;

    const celsius =
      scale === "f" ? tryConvert(temperature, toCelsius) : temperature;
    const fahrenheit =
      scale === "c" ? tryConvert(temperature, toFahrenheit) : temperature;

    return (
      <div>
        <TemperatureInput
          testId="celsius-input"
          scale="c"
          temperature={celsius}
          onTemperatureChange={this.handleCelsiusChange}
        />
        <TemperatureInput
          testId="fahrenheit-input"
          scale="f"
          temperature={fahrenheit}
          onTemperatureChange={this.handleFahrenheitChange}
        />
        <BoilingVerdict celsius={parseFloat(celsius)} />
      </div>
    );
  }
}
```

Notice how we specify the test id's for the temperature inputs.

Let's test that the converter works correctly when we enter a temperature of 33
degrees Celsius.

```js
const temperatureCalculator = mount(<TemperaturCalculator />);

simulate(temperatureCalculator, {
  type: "change",
  target: "[data-test-id=celsius-input]",
  value: "33"
});

expect(
  temperatureCalculator,
  "queried for first",
  "[data-test-id=fahrenheit-input]",
  "to have attributes",
  {
    value: "91.4"
  }
).and(
  "queried for first",
  "[data-test-id=boiling-verdict]",
  "to have text",
  "The water would not boil."
);
```

It is probably also a good idea to check that the conversion works in the
opposite direction:

```js
simulate(temperatureCalculator, {
  type: "change",
  target: "[data-test-id=fahrenheit-input]",
  value: "220"
});

expect(
  temperatureCalculator,
  "queried for first",
  "[data-test-id=celsius-input]",
  "to have attributes",
  {
    value: "104.444"
  }
).and(
  "queried for first",
  "[data-test-id=boiling-verdict]",
  "to have text",
  "The water would boil."
);
```

In a real application we would probably make some more tests, but they will all
follow the similar structure as what you already have seen.
