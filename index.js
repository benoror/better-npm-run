#!/usr/bin/env node
var program = require('commander');

program
  .option('-e, --encoding [type]', 'Specify the encoding of dotenv file')
  .option('-p, --path [type]', 'Specify a custom path of dotenv file')
  .option('-s, --silent', 'silent')
  .parse(process.argv);
var scriptName = program.args[0];

if (!program.silent) {
  console.log('running better-npm-run in', process.cwd());
}
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
  process.stderr.write('ERROR: No betterScript with name "' + scriptName + '" was found!');
  process.exit(1);
}

if(!program.silent) {
  console.log('Executing script: ' + scriptName + '\n');
}

exec(pkg.betterScripts[scriptName], program, function (error, stdout, stderr) {
  process.stderr.write(stderr);
  process.stdout.write(stdout);
  if(error !== null) {
    console.log('exec error: '+error);
  }
});
