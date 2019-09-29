const args = require('./args');

const test = (name, callback) => {
  console.log(`Testing ${name} ...`);
  try {
    callback();
    console.log('[PASSED]');
  } catch (ex) {
    console.error(`Test error ${name}.`);
    throw ex;
  }
};

const compare = (a, b) => {
  for (const key in b) {
    if (a[key] !== b[key]) {
      throw new Error(
        `The value '${key}' does not match. Expected '${b[key]}' (${typeof b[
          key
        ]}), but is '${a[key]}' (${typeof a[key]})`
      );
    }
  }
};

test('Default settings.', () => {
  compare(args(), {
    D: true,
    name: 'Hello World',
    path: "'c:/temp'",
    answer: 42,
    as: 'one=two'
  });
});

test('No auto value parser.', () => {
  compare(args({ autoParse: false }), {
    D: true,
    name: 'Hello World',
    path: "'c:/temp'",
    answer: '42',
    as: 'one=two'
  });
});

test('Custom value parser. (Date)', () => {
  compare(
    args({
      args: ['-date=2019-09-30T12:00:00.000Z'],
      keyParser: {
        date: value => new Date(value).getTime()
      }
    }),
    {
      date: 1569844800000
    }
  );
});

test('Space parameter. (not supported)', () => {
  compare(
    args({
      args: ['-one', '1', '-two', '2', '-three', '3']
    }),
    {
      one: true,
      two: true,
      three: true
    }
  );
});

test('Simple parameters.', () => {
  compare(
    args({
      args: ['-one=1', '-two=2', '-three=3']
    }),
    {
      one: 1,
      two: 2,
      three: 3
    }
  );
});
