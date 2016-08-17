[![NPM](https://nodei.co/npm/better-npm-run.png)](https://npmjs.org/package/better-npm-run)

[![Join the chat at https://gitter.im/benoror/better-npm-run](https://badges.gitter.im/benoror/better-npm-run.svg)](https://gitter.im/benoror/better-npm-run?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

[![Build Status](https://semaphoreci.com/api/v1/benoror/better-npm-run/branches/master/badge.svg)](https://semaphoreci.com/benoror/better-npm-run)

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

# Intro

Better NPM scripts runner

- Avoid hard-coded commands in package.json
- Cross-platform compatibility, originally needed by:
    - https://github.com/formly-js/angular-formly/issues/305
        - https://github.com/npm/npm/issues/2800

# Inspired by

- https://www.npmjs.com/package/with-package

# Alternatives

- [argv-set-env](https://github.com/kentcdodds/argv-set-env)
- [cross-env](https://github.com/kentcdodds/cross-env)

# Usage in package.json

From this:
```
{
  "scripts": {
    "build:dist": "NODE_ENV=development webpack --config $npm_package_webpack --progress --colors",
    "test": "NODE_ENV=production karma start"
  }
}
```

To this:
```
{
  "devDependencies": {
    "better-npm-run": "~0.0.1"
  },
  "scripts": {
    "build:dist": "better-npm-run build:dist",
    "test": "better-npm-run test"
  },
  "betterScripts": {
    "build:dist": {
      "command": "webpack --config $npm_package_webpack --progress --colors",
      "env": {
        "NODE_ENV": "development"
      }
    },
    "build:prod": {
      "command": "webpack --config $npm_package_webpack --progress --colors",
      "env": {
        "NODE_ENV": "production"
      }
    },
    "test": {
      "command": "karma start",
      "env": {
        "NODE_ENV": "test"
      }
    }
  }
}
```

# .env File

If you have an `.env` file in your project root it will be loaded on every command

```
NODE_PATH=./:./lib
PORT=5000
```

# Environment variable substitution

```json
"betterScripts": {
  "start": {
    "command": "node start.js ${COPY_OF_NODE_ENV}",
    "env": {
      "FOO": "bar",
      "COPY_OF_NODE_ENV": "${NODE_ENV}"
    }
  }
}
```

Environment variables will be substituted into:

- the `command` by means of automatic substitution in `child_process.spawn()`.
- each of the `env` values using string interpolation.

# Shell scripts

Currently, using [bash variables](http://tldp.org/LDP/abs/html/internalvariables.html) (PWD, USER, etc.) is not possible:

``` JSON
  "command": "forever start -l ${PWD}/logs/forever.log -o ${PWD}/logs/out.log -e ${PWD}/logs/errors.log -a index.js",
```

In order to use them, you can create an script file (`.sh`) instead:

`forever.sh`:
``` bash
forever start -l ${PWD}/logs/forever.log -o ${PWD}/logs/out.log -e ${PWD}/logs/errors.log -a index.js
```

`package.json`:
``` javascript
  "command": "./forever.sh"
```

## cli commands

This module expose 2 cli commands:
- `better-npm-run` and,
- a shorter one: `bnr` which is an alias to the former.

The shorter one is useful for cases where you have a script that calls several `better-npm-run` scripts. e.g:

using the normal cli name

```javascript
"scripts": {
  "dev": "shell-exec 'better-npm-run install-hooks' 'better-npm-run watch-client' 'better-npm-run start-dev' 'better-npm-run start-dev-api' 'better-npm-run start-dev-worker' 'better-npm-run start-dev-socket'",
}
```

using the shorter alias

```javascript
"scripts": {
  "dev": "shell-exec 'bnr install-hooks' 'bnr watch-client' 'bnr start-dev' 'bnr start-dev-api' 'bnr start-dev-worker' 'bnr start-dev-socket'",
}
```
