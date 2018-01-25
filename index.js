'use strict';

const pathLib = require('path');

const dirname = pathLib.dirname;
const join = pathLib.join;
const resolve = pathLib.resolve;

const npmCliPath = require('npm-cli-path');
const rootDir = resolve('/');

const getNpmCliDir = npmCliPath().then(result => {
  result = dirname(result);

  do {
    try {
      require.resolve(join(result, 'package.json'));
      break;
    } catch (_) {
      result = dirname(result);
    }
  } while (result !== rootDir);

  return result;
});

module.exports = function npmCliDir() {
  return getNpmCliDir;
};
