'use strict';

const findPkgDir = require('find-pkg-dir');
const npmCliPath = require('npm-cli-path');

const getNpmCliDir = (async () => findPkgDir(await npmCliPath()))();

module.exports = async function npmCliDir() {
	return getNpmCliDir;
};
