'use strict';

const {dirname, join, parse} = require('path');

const npmCliPath = require('npm-cli-path');

const getNpmCliDir = (async () => {
	const path = parse(await npmCliPath());
	const {root} = path;
	let result = path.dir;

	do {
		try {
			require.resolve(join(result, 'package.json'));
			break;
		} catch (_) {
			result = dirname(result);
		}
	} while (result !== root);

	return result;
})();

module.exports = async function npmCliDir() {
	return getNpmCliDir;
};
