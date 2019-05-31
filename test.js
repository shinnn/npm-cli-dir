'use strict';

const {basename, resolve} = require('path');
const {doesNotReject, equal, rejects} = require('assert').strict;
const {execFile} = require('child_process');
const {promisify} = require('util');

const clearAllModules = require('clear-module').all;
const npmCliDir = require('.');
const getPathKey = require('path-key');
const test = require('testit');

test('resolve a path of the directory where npm CLI is installed', async () => {
	await npmCliDir();
	equal(basename(await npmCliDir()), 'npm');
	equal(...await Promise.all([
		(async () => {
			const dir = await npmCliDir();
			return `${require(dir).version}\n`;
		})(),
		(async () => (await promisify(execFile)('npm', ['--version'], {
			shell: process.platform === 'win32'
		})).stdout)()
	]));
});

test('fail when no npm CLI is found', async () => {
	const pathKey = getPathKey();
	const originalPath = process.env[pathKey];

	delete process.env.npm_execpath;
	process.env[pathKey] = resolve('/n/o/n/e/');
	clearAllModules();

	const npmCliDirReimported = require('.');

	await rejects(async () => npmCliDirReimported(), {code: 'ENOENT'});
	process.env[pathKey] = originalPath;
	await doesNotReject(async () => npmCliDirReimported());
});
