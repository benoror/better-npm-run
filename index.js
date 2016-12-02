#!/usr/bin/env node

var scriptName = process.argv[2];

var isSilent = process.argv.indexOf('-s') > -1 || process.argv.indexOf('--silent') > -1;

isSilent || console.log('running better-npm-run in', process.cwd());
var join = require('path').join;
var fullPackagePath = join(process.cwd(), 'package.json');
var pkg = require(fullPackagePath);
var exec = require('./lib/exec.js');

if (!pkg.scripts) {
  process.stderr.write('ERROR: No scripts found!');
  process.exit(1);
}
if (!pkg.betterScripts) {
  process.stderr.write('ERROR: No betterScripts found!');
  process.exit(1);
}
if (!scriptName) {
  process.stderr.write('ERROR: No script name provided!');
  process.exit(1);
}
if (!pkg.betterScripts[scriptName]) {
  process.stderr.write('ERROR: No betterScript with name "'+scriptName+'" was found!');
  process.exit(1);
}


isSilent || console.log('Executing script: ' + scriptName + '\n');


exec(pkg.betterScripts[scriptName], isSilent, function (error, stdout, stderr) {
  process.stderr.write(stderr);
  process.stdout.write(stdout);
  if(error !== null) {
    console.log('exec error: '+error);
  }
});

