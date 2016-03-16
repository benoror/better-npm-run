require('dotenv').config({silent: true});

var spawn = require('child_process').spawn;
var objectAssign = require('object-assign');
var path = require('path');

module.exports = function exec(script) {

	var argv = process.argv.splice(3);
	var command = script.command + ' ' + argv.join(' ');

	script.env = script.env || {};

	Object.keys(script.env).forEach(function (key) {
		script.env[key] = script.env[key].replace(/:/g, path.delimiter);
	});

	var env = objectAssign(process.env, script.env);

	var sh = 'sh', shFlag = '-c';
	if (process.platform === 'win32') {
		sh = 'cmd';
		shFlag = '/c';
		command = '"' + command.trim() + '"';
	}

	console.log('to be executed:', command);
	spawn(sh, [shFlag, command], {
		env: env,
		windowsVerbatimArguments: process.platform === 'win32',
		stdio: ['pipe', process.stdout, process.stderr]
	}).on('close', function(code) {
		process.exit(code);
	});

}
