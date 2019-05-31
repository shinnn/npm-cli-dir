# npm-cli-dir

[![npm version](https://img.shields.io/npm/v/npm-cli-dir.svg)](https://www.npmjs.com/package/npm-cli-dir)
[![Build Status](https://travis-ci.com/shinnn/npm-cli-dir.svg?branch=master)](https://travis-ci.com/shinnn/npm-cli-dir)
[![codecov](https://codecov.io/gh/shinnn/npm-cli-dir/branch/master/graph/badge.svg)](https://codecov.io/gh/shinnn/npm-cli-dir)

A [Node.js](https://nodejs.org/) module to resolve a path of the directory where [npm CLI](https://github.com/npm/cli) is installed

```javascript
const npmCliDir = require('npm-cli-dir');

(async () => {
  const dir = await npmCliDir(); //=> '/usr/local/lib/node_modules/npm'
})();
```

## Installation

[Use](https://docs.npmjs.com/cli/install) [npm](https://docs.npmjs.com/about-npm/).

```
npm install npm-cli-dir
```

## API

```javascript
const npmCliDir = require('npm-cli-dir');
```

### npmCliDir()

Return: `Promise<string>`

```javascript
const {readdir} = require('fs').promises;
const npmCliDir = require('npm-cli-dir');

(async () => {
  await readdir(await npmCliDir());
  //=> ['.mailmap', '.npmignore', '.travis.yml', 'AUTHORS', 'CHANGELOG.md', ...]
})();
```

## License

[ISC License](./LICENSE) © 2017 - 2019 Watanabe Shinnosuke
