var spawn = require('child_process').spawn;
var dotenv = require('./dot-env');

module.exports = function exec(script) {

	// Grab the command section of the entered command
	var command = script.command.split(' ')[0];
	// Anything else is options
	var options = script.command.split(' ').slice(1);

	var argv = process.argv.splice(3);

	options = options.concat(argv);

	script.env = script.env || {};

	var env = Object.assign(process.env, script.env, dotenv);

	console.log('to be executed:', command, options.join(' '));
	var command = spawn(command, options, {env: env});

	command.stdout.on('data', function(data) {
		process.stdout.write(data);
	});

	command.stderr.on('data', function(data) {
		process.stderr.write(data);
	});

	command.on('error', function(err) {
		process.stderr.write(err);
		process.exit(err.code || 1);
	});

}
