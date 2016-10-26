#!/usr/bin/env node

console.log('running better-npm-run in', process.cwd());
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
if (!process.argv[2]) {
  process.stderr.write('ERROR: No script name provided!');
  process.exit(1);
}
if (!pkg.betterScripts[process.argv[2]]) {
  process.stderr.write('ERROR: No betterScript with name "'+process.argv[2]+'" was found!');
  process.exit(1);
}

console.log('Executing script: ' + process.argv[2] + '\n');

exec(pkg.betterScripts[process.argv[2]], function (error, stdout, stderr) {
  process.stderr.write(stderr);
  process.stdout.write(stdout);
  if(error !== null) {
    console.log('exec error: '+error);
  }
});
