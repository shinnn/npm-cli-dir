/*!
 * npm-cli-dir | MIT (c) Shinnosuke Watanabe
 * https://github.com/shinnn/npm-cli-dir
*/
'use strict';

var npmCliPath = require('npm-cli-path');
var pkgDir = require('pkg-dir');

var getNpmCliDir = npmCliPath().then(pkgDir);

module.exports = function npmCliDir() {
  return getNpmCliDir;
};
