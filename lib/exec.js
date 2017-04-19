var spawn = require('child_process').spawn,
    objectAssign = require('object-assign');

module.exports = function exec(script, program) {
  script = (typeof script === 'string' ? {command: script} : script)

  var dotenvConfig = objectAssign({ silent: true }, {
    encoding: program.encoding,
    path: script.envpath || program.path
  });

  require('dotenv').config(dotenvConfig);

  var argv = process.argv.splice(3),
      command = script.command + ' ' + argv.join(' ');

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
