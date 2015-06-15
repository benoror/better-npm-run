# Intro

Better NPM scripts runner

- Avoid hard-coded commands in package.json
- Cross-platform compatibility, originally needed by:
    - https://github.com/formly-js/angular-formly/issues/305
        - https://github.com/npm/npm/issues/2800

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

# Inspired by

- https://www.npmjs.com/package/with-package