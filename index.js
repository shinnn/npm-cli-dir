'use strict';

const findPkgDir = require('find-pkg-dir');
const npmCliPath = require('npm-cli-path');

let path;
const firstTry = (async () => {
	try {
		path = findPkgDir(await npmCliPath());
	} catch {
		return false;
	}

	return true;
})();

module.exports = async function npmCliDir() {
	if (!path && !await firstTry) {
		path = findPkgDir(await npmCliPath());
	}

	return path;
};
