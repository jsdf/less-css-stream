var through = require('through');
var less = require('less');
var path = require('path');
var extend = require('extend-object');

module.exports = function(file, opts) {
  var data = '',
  config = extend({
    compress: false,
    paths: []
  }, opts);

  if (!/\.less$/.test(file)) {
    return through();
  }

  return through(write, end);

  function write(buf) {
    data += buf;
  }

  function end() {
    var self = this;
    var fileConfig = extend({}, config);

    // Injects the path of the current file.
    fileConfig.filename = file;

    less.render(data, fileConfig, function (err, output) {
      if (err) {
        self.emit('error', new Error(getErrorMessage(err), file, err.line));
      } else {
        self.queue(output.css);
      }
      self.queue(null);
    });
  }

  function getErrorMessage(err) {
    var msg = err.message;
    if (err.line) {
      msg += ", line " + err.line;
    }
    if (err.column) {
      msg += ", column " + err.column;
    }
    if (err.extract) {
      msg += ": \"" + err.extract + "\"";
    }

    return msg;
  }
};
