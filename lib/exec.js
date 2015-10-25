var child_spawn = require('child_process').spawn;

module.exports = function exec(script) {

	// Grab the command section of the entered command
	var command = script.command.split(' ')[0];
	// Anything else is options
	var options = script.command.split(' ').slice(1);

	console.log('to be executed:' + command);
	var command = child_spawn(command, options, script.env);

	command.stdout.on('data', function(data) {
	  process.stdout.write(data);
	});
	command.stderr.on('data', function(data) {
	  process.stderr.write(data);
	});
	command.on('error', function(err) {
		process.stderr.write("Task failed with error: " + err + "\n");
	});
	command.on('close', function(code){
		if(code != 0){
			process.stderr.write("Process exited with code: " + code + "\n");
		}
		else{
			process.stderr.write("Process executed successfully\n");
		}
	})

}
