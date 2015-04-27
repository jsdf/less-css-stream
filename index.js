var through = require('through');
var less = require('less');
var path = require('path');
var extend = require('extend-object');

module.exports = function(file, opts) {
    config = extend({
      compress: false,
      paths: []
    }, opts);

    var data = '';
    if (file !== undefined && path.extname(file) !== '.less') {
        return through();
    } else {
        return through(write, end);
    }

    function write(buf) {
        data += buf;
    }

    function end() {
        var self = this;
        var fileConfig = extend({}, config);

        // Injects the path of the current file.
        fileConfig.filename = file;

        less.render(data, fileConfig, function (err, css) {
            if (err) {
                // TODO: add a better error message
                err.message = err.message + ' in file ' + err.filename + ' line no. ' + err.line;
                self.emit('error', new Error(err));
            } else {
                self.queue(css);
            }
            self.queue(null)
        });
    }
};

