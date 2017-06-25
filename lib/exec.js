var spawn = require('child_process').spawn,
    objectAssign = require('object-assign');

module.exports = function exec(script, program) {
  var dotenvConfig = objectAssign({ silent: true }, {
    encoding: program.encoding,
    path: program.path
  });

  require('dotenv').config(dotenvConfig);

  var argvIndex = -1;
      firstArg = program.args[0];
  if (firstArg !== undefined) {
    argvIndex = process.argv.indexOf(firstArg);
  }
  var argv = argvIndex === -1 ? [] : process.argv.splice(argvIndex + 1),
      command = (typeof script === 'string' ? script : script.command) + ' ' + argv.join(' ');

  script.env = script.env || {};

  var env = objectAssign({}, process.env, script.env),
      sh = 'sh',
      shFlag = '-c';

  if (process.platform === 'win32') {
    sh = 'cmd';
    shFlag = '/c';
    command = '"' + command.trim() + '"';
  }

  if (!program.silent) {
    console.log('to be executed:', command);
  }
  spawn(sh, [shFlag, command], {
    env: env,
    windowsVerbatimArguments: process.platform === 'win32',
    stdio: 'inherit'
  }).on('close', function(code) {
    process.exit(code);
  });

};
