# Node Key Args

A super lightweight argument parser for NodeJs. Zero dependencies. Simply works.

## Install

```text
npm i node-args
```

## Usage

```js
// Get all custom key arguments as object.
const args = require('node-args')();

// Get `args` as function to call it later.
const args = require('node-args');

// You can also pass a configuration.
const args = require('node-args')(config);
```

## Configuration

| Property  | Type     | Default               | Description                       |
| --------- | -------- | --------------------- | --------------------------------- |
| autoParse | boolean  | true                  | Automatically parses the values.  |
| keyParser | object   | null                  | Custom value parser for each key. |
| args      | string[] | process.argv.slice(2) | Set input argument.               |

## Examples

```js
// The most common way to simply get the arguments.
const args = require('node-args')();
```

```js
// Disable the auto value parser.
const args = require('node-args')({ autoParse: false });
```

```js
// Custom value parser for the key 'date'.
// $ node demo.js -date="2019-09-30T12:00:00.000Z"
args({
  keyParser: {
    date: value => new Date(value).getTime()
  }
});
```

Only pass arguments with an equal sign. Spaces are not supported and unsafe.

```bash
$ node demo.js --one 1 --two 2 --three 3
```

Result: `{one: true, two: true, three: true}`

Use:

```bash
$ node demo.js --one=1 --two=2 --three=3
```

Because NodeJs separates the arguments by spaces and this library does not assign such values.

**NOTE** You arguments just need one or two hyphens (dashes). It's up to use how to use it. Generally single hyphens are used for single characters like `-S`. Double hyphens are used for full names with optional value like `--save` or `--save=true`.
