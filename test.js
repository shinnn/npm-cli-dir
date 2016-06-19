'use strong';

const path = require('path');

const execa = require('execa');
const npmCliDir = require('.');
const test = require('tape');

test('npmCliDir()', t => {
  t.plan(3);

  t.strictEqual(npmCliDir.name, 'npmCliDir', 'should have a function name.');

  Promise.all([
    npmCliDir().then(dir => {
      t.strictEqual(path.basename(dir), 'npm', 'should resolve a directory path.');
      return Promise.resolve(require(dir).version);
    }),
    execa.stdout('npm', ['--version'])
  ])
  .then(results => {
    t.strictEqual(
      results[0],
      results[1],
      'should resolve the path right above npm\'s package.json.'
    );
  })
  .catch(t.fail);
});
