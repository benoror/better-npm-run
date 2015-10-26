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
  },

}
```

Also if you have .env file in your project root it will be loaded on every command

// example .env file

    NODE_PATH=./:./lib
    PORT=5000

