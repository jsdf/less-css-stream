var path = require('path');
var _ = require('underscore');
var through = require('through');
var less = require('less');

module.exports = function(filepath, opts) {
  config = _.defaults(opts || {}, {
    compress: false,
    paths: []
  });

	var data = "";

	if(filepath !== undefined && path.extname(filepath) !== ".less") return through();
	else return through(write, end);

	function write(buf) {
		data += buf;
	}

	function end() {
		var self = this;
    var fileConfig = _.clone(config);

    // Injects the path of the current file.
    fileConfig.filename = filepath;

    less.render(data, fileConfig, function (err, css) {
      if (err) {
        // add a better error message
        err.message = err.message + ' in file ' + err.filename + ' line no. ' + err.line;

				self.emit('error', new Error(err));
      } else {
      	self.queue(css);
      }
    	self.queue(null)
    });
	}
};

