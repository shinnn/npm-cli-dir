'use strict';

const findPkgDir = require('find-pkg-dir');
const npmCliPath = require('npm-cli-path');

let result = null;

module.exports = async function npmCliDir() {
	if (result !== null) {
		return result;
	}

	result = findPkgDir(await npmCliPath());
	return result;
};
