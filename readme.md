# Node Key Args

[![Version][version]][package]

A super lightweight argument parser for NodeJs. Zero dependencies. Simply works.

With auto and custom parser.
By default it parses the values by type detection.
You can also define a parser for every key you want.
For example for dates. It's really easy.

## Install

Available on [NPM][package].

```text
npm i key-args
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
// $ node demo.js --message="Hello World" --id=42 -D
const args = require('node-args')();

// Result: { message: 'Hello World', id: 42, D: true }
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
    date: (value) => new Date(value).getTime(),
  },
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

**NOTE** You arguments just need one or two hyphens (dashes). It's up to you how to use it. Generally single hyphens are used for single characters like `-S`. Double hyphens are used for full names with optional value like `--save` or `--save=true`.

## License

© Copyright 2019 - 2020 Domink Geng - [MIT](LICENSE) - [GitHub][github]

[version]: https://img.shields.io/npm/v/key-args.svg?style=flat-square
[package]: https://www.npmjs.com/package/key-args
[github]: https://github.com/domske/key-args
