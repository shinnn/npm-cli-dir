'use strict';

var exec = require('child_process').exec;
var path = require('path');

var npmCliDir = require('./');
var pify = require('pify');
var PinkiePromise = require('pinkie-promise');
var test = require('tape');

var execP = pify(exec, PinkiePromise);

test('npmCliDir()', function(t) {
  t.plan(3);

  t.strictEqual(npmCliDir.name, 'npmCliDir', 'should have a function name.');

  PinkiePromise.all([
    npmCliDir().then(function(dir) {
      t.strictEqual(path.basename(dir), 'npm', 'should resolve a directory path.');
      return PinkiePromise.resolve(require(dir).version);
    }),
    execP('npm --version')
  ])
  .then(function(results) {
    t.strictEqual(
      results[0],
      results[1].trim(),
      'should resolve the path right above npm\'s package.json.'
    );
  })
  .catch(t.fail);
});
