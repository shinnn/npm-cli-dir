# npm-cli-dir

[![NPM version](https://img.shields.io/npm/v/npm-cli-dir.svg)](https://www.npmjs.com/package/npm-cli-dir)
[![Build Status](https://travis-ci.org/shinnn/npm-cli-dir.svg?branch=master)](https://travis-ci.org/shinnn/npm-cli-dir)
[![Build status](https://ci.appveyor.com/api/projects/status/e83hdqrnieckmm5c/branch/master?svg=true)](https://ci.appveyor.com/project/ShinnosukeWatanabe/npm-cli-dir/branch/master)
[![Coverage Status](https://img.shields.io/coveralls/shinnn/npm-cli-dir.svg)](https://coveralls.io/github/shinnn/npm-cli-dir)
[![Dependency Status](https://david-dm.org/shinnn/npm-cli-dir.svg)](https://david-dm.org/shinnn/npm-cli-dir)
[![devDependency Status](https://david-dm.org/shinnn/npm-cli-dir/dev-status.svg)](https://david-dm.org/shinnn/npm-cli-dir#info=devDependencies)

A [Node](https://nodejs.org/) module to resolve the directory path where [npm](https://www.npmjs.com/) CLI is installed

```javascript
const npmCliDir = require('npm-cli-dir');

npmCliDir().then(dir => {
  dir; //=> '/usr/local/lib/node_modules/npm'
});
```

## Installation

[Use npm.](https://docs.npmjs.com/cli/install)

```
npm install npm-cli-dir
```

## API

```javascript
const npmCliDir = require('npm-cli-dir');
```

### npmCliDir()

Return: [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise) instance

It resolves the base path of globally installed [npm](https://github.com/npm/npm) CLI.

```javascript
const fs = require('fs');
const path = require('path');
const npmCliDir = require('npm-cli-dir');

npmCliDir().then(dir => {
  fs.readdirSync(dir);
  //=> ['.mailmap', '.npmignore', '.travis.yml', 'AUTHORS', 'CHANGELOG.md', ...]

  require(path.join(dir, 'package.json'));
  //=> { name: 'npm', optionalDependencies: {}, license: 'Artistic-2.0', ... }

  require(dir);
  //=> EventEmitter { version: '3.4.1', ... }
});
```

## License

Copyright (c) 2015 [Shinnosuke Watanabe](https://github.com/shinnn)

Licensed under [the MIT License](./LICENSE).