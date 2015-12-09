[![NPM](https://nodei.co/npm/better-npm-run.png)](https://npmjs.org/package/better-npm-run)

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

# Installation

`npm install --save-dev better-npm-run`

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
    "build": [
      {
        "run": "build:dist"
      },
      {
        "run": "build:prod"
      }
    ],
    "test": {
      "command": "karma start",
      "env": {
        "NODE_ENV": "test"
      }
    }
  }
}
```

Also if you have .env file in your project root it will be loaded on every command

```
NODE_PATH=./:./lib
PORT=5000
```

# Using bash variables

Currently, using [bash variables](http://tldp.org/LDP/abs/html/internalvariables.html) (PWD, USER, etc.) in `"command"` like this is not possible: 

`package.json`:
``` JSON
{
  "name": "Example App",
  "version": "v1.0.0",
  "scripts": {
    "development": "better-npm-run development",
  },
  "betterScripts": {
    "development": {
      "command": "forever start -l ${PWD}/logs/forever.log -o ${PWD}/logs/out.log -e ${PWD}/logs/errors.log -a index.js",
      "env": {
        "SERVER_TYPE": "development",
        "PORT": 9001
      }
    }
  },
  "devDependencies": {
    "better-npm-run": "0.0.4"
  }
}
```

In order to use bash variables, you can save the script into a bash file (`.sh`) and run it there, like so:

`forever.sh`:
```
forever start -l ${PWD}/logs/forever.log -o ${PWD}/logs/out.log -e ${PWD}/logs/errors.log -a index.js
```

`package.json`:
```
"command": "bash forever.sh"
```
