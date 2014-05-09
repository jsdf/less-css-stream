less-css-stream
===============

A less to css stream wrapper around [less](https://github.com/less/less.js).

Takes a file argument and an optional opts argument that is [passed through to less](http://lesscss.org/#using-less-configuration). Returns a [through stream](https://github.com/dominictarr/through) that has less contents written in and outputs the compiled css.

Can be as a [parcelify](https://github.com/rotundasoftware/parcelify) or [cartero](https://github.com/rotundasoftware/cartero) transform.

#example
```javascript
var lessCssStream = require('less-css-stream');
var fs = require('fs');
var path = require('path');

var inputFile = path.join(__dirname, "sampleStyle.less");

var opts = { paths : ['./vendor/bootstrap'], compress: true };

fs.createReadStream(inputFile).pipe(lessCssStream(inputFile, opts)).pipe(process.stdout);
```

#usage

### lessCssStream(file [, opts ])

`file` - the less file being

`opts` - optional [options hash](http://lesscss.org/#using-less-configuration) passed through to `less.render`
