var spawn = require('child_process').spawn;
var dotenv = require('./dot-env');
var objectAssign = require('object-assign');

module.exports = function exec(script) {

	// Grab the command section of the entered command
	var command = script.command.split(' ')[0];
	// Anything else is options
	var options = script.command.split(' ').slice(1);

	var argv = process.argv.splice(3);

	options = options.concat(argv);

	script.env = script.env || {};

	var env = objectAssign(process.env, script.env, dotenv);

	console.log('to be executed:', command, options.join(' '));
	spawn(command, options, {
		env: env,
		stdio: ['pipe', process.stdout, process.stderr]
	}).on('close', function(code) {
		process.exit(code);
	});

}
