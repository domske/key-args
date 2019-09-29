const REGEX = {
  /** Matches the argument by `-key=value` */
  ARG: /--?([^=\s]+)=?(.*)?/
};

/**
 * Parses the value of an argument. (Auto-detect)
 * @param {string} value Value of an argument.
 * @param {object} [keyParser] Object with key name and functions.
 * @param {string} [key] The key for the keyParser.
 * @returns {any} The parsed value.
 */
const parseValue = (value, keyParser, key) => {
  try {
    if (keyParser && typeof keyParser[key] === 'function') {
      return keyParser[key](value);
    }

    // Try parse number.
    const num = Number(value);
    if (!Number.isNaN(num)) {
      return num;
    }

    // Check if boolean true.
    if (value === 'true') {
      return true;
    }

    // Check if boolean false.
    if (value === 'false') {
      return false;
    }
    // Return default. (string)
    return value;
  } catch (ex) {
    return value;
  }
};

/**
 * @typedef  {{ [key: string]: (value: any) => any }} KeyParser Custom value parser for each key.
 */

/**
 * @typedef  {object} Config
 * @property {boolean} [autoParse=true] Automatically parses the values.
 * @property {KeyParser} [keyParser] Custom value parser for each key.
 * @property {string[]} [args] Set input argument. Default: process.argv.slice(2)
 */

/**
 * @type {Config}
 */
const defaultConfig = {
  autoParse: true,
  keyParser: null,
  args: null
};

/**
 * Returns the arguments passed at program start.
 * Automatically parses the custom arguments by the following syntax.
 * Example: `node demo.js -D --name=\"Hello World\" --path='c:/temp' --answer=42 --as="one=two"`
 * Result: `{ D: true, name: 'Hello World', answer: 42, path: 'c:/temp', as: 'one=two' }`
 * Note: Single and double hyphen (dashes) are handled in the same way.
 * It's up to you what and how to use it. Generally single is for single letters.
 * Arguments with a space between key and value are not allowed.
 * Because this is an unsafe way to pass arguments. Node separates arguments by space.
 * @param {Config} [config] A optional configuration.
 * @returns {{[key: string]: any}} Object with the arguments key-value.
 */
module.exports = config => {
  config = Object.assign({}, defaultConfig, config);
  const args = config.args || process.argv.slice(2);
  const obj = {};
  args.forEach(arg => {
    const matches = arg.match(REGEX.ARG);
    if (!matches) {
      // No matches. Skip...
      return;
    }

    const key = matches[1];
    if (!key) {
      // Invalid key. Skip...
      return;
    }

    const value =
      matches[2] !== undefined
        ? config.autoParse
          ? parseValue(matches[2], config.keyParser, key)
          : matches[2]
        : true;
    obj[key] = value;
  });

  return obj;
};
