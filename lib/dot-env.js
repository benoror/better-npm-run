var fs = require('fs');
var eol = require('endofline')
var path = require('path');
var env = {};
try {
    fs.readFileSync(path.join(process.cwd(), '.env'), 'utf-8')
      .split(eol)
      .forEach(function(line) {
        if (!line) {
            return;
        }
        line = line.split('=');
        env[line[0]] = line[1];
    });
} catch(e) {
    // do nothing
}
module.exports = env;
