var child_exec = require('child_process').exec;
var fs = require('fs');
var eol = require('endofline')
var path = require('path');

module.exports = function exec(script) {

	var command_line = script.command;

	script.env = script.env || {};

	Object.keys(script.env).forEach(function (key) {
		var value = script.env[key];

		if(process.platform === 'win32') {
		  command_line = 'set ' + key + '=' + script.env[key] + '&& ' + command_line;
		} else {
		  command_line = key + '=' + script.env[key] + ' ' + command_line;
		}
	});

	try {
		fs.readFileSync(path.join(process.cwd(), '.env'), 'utf-8')
		  .split(eol)
		  .forEach(function(line) {
			command_line = line + ' ' + command_line
		});
	} catch(e) {
		// do nothing
	}

	console.log('to be executed:' + command_line);
	var command = child_exec(command_line, function (error, stdout, stderr) {
		if (error) {
			process.exit(error.code || 1);
		}
	});
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
