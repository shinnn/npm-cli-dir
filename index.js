'use strict';

const findPkgDir = require('find-pkg-dir');
const npmCliPath = require('npm-cli-path');

let path;
const firstTry = (async () => {
	try {
		path = findPkgDir(await npmCliPath());
		return true;
	} catch (err) {
		return false;
	}
})();

module.exports = async function npmCliDir() {
	if (!path && !await firstTry) {
		path = findPkgDir(await npmCliPath());
	}

	return path;
};
