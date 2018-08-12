'use strict';

const {basename, resolve} = require('path');
const {execFile} = require('child_process');
const {promisify} = require('util');

const clearAllModules = require('clear-module').all;
const pathKey = require('path-key');
const test = require('tape');

test('npmCliDir()', async t => {
	const npmCliDir = require('.');

	t.equal(
		basename(await npmCliDir()),
		'npm',
		'should resolve a directory path.'
	);

	const results = await Promise.all([
		(async () => {
			const dir = await npmCliDir();
			return `${require(dir).version}\n`;
		})(),
		(async () => (await promisify(execFile)('npm', ['--version'], {
			shell: process.platform === 'win32'
		})).stdout)()
	]);

	t.equal(
		...results,
		'should resolve the path right above npm\'s package.json.'
	);

	t.end();
});

test('npmCliDir() in an environment where npm CLI is not installed', async t => {
	delete process.env.npm_execpath;
	process.env[pathKey()] = resolve('/n/o/n/e/');
	clearAllModules();

	const npmCliDir = require('.');

	try {
		await npmCliDir();
	} catch ({code}) {
		t.equal(
			code,
			'ENOENT',
			'should fail to resolve the path.'
		);
	}

	t.end();
});
