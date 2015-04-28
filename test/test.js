var lessCssStream = require('../');
var fs = require('fs');
var path = require('path');
var concatStream = require('concat-stream');
var test = require("tap").test;

test("it compiles less", function (t) {
  t.plan(1);
  var inputFile = path.join(__dirname, 'sampleStyle.less');
  var expectedFile = path.join(__dirname, 'expected.css');

  fs.createReadStream(inputFile)
    .pipe(lessCssStream(inputFile, {compress: true}))
    .pipe(concatStream(function(output) {
      var expected = fs.readFileSync(expectedFile, {encoding: 'utf8'});
      t.equal(output, expected, "actual output should be same as expected");
      t.end();
    }));
});
