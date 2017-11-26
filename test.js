'use strict';

const {basename} = require('path');

const getStdout = require('execa').stdout;
const npmCliDir = require('.');
const test = require('tape');

test('npmCliDir()', async t => {
  const results = await Promise.all([
    (async () => {
      const dir = await npmCliDir();

      t.equal(basename(dir), 'npm', 'should resolve a directory path.');
      return require(dir).version;
    })(),
    getStdout('npm', ['--version'])
  ]);

  t.equal(
    ...results,
    'should resolve the path right above npm\'s package.json.'
  );

  t.end();
});
