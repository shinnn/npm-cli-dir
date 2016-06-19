'use strict';

const npmCliPath = require('npm-cli-path');
const pkgDir = require('pkg-dir');

const getNpmCliDir = npmCliPath().then(pkgDir);

module.exports = function npmCliDir() {
  return getNpmCliDir;
};
