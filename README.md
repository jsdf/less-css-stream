# less-css-stream

A less to css stream wrapper around [less](https://github.com/less/less.js).

Takes a file argument and an optional opts argument that is [passed through to less](http://lesscss.org/#using-less-configuration). Returns a [through stream](https://github.com/dominictarr/through) that has less contents written in and outputs the compiled css.

Can be used as a transform for [parcelify](https://github.com/rotundasoftware/parcelify), [cartero](https://github.com/rotundasoftware/cartero) or [browserify-assets](https://github.com/jsdf/browserify-assets).

## example
```javascript
var lessCssStream = require('less-css-stream');
var fs = require('fs');
var path = require('path');

var inputFile = path.join(__dirname, "sampleStyle.less");

var opts = { paths : ['./vendor/bootstrap'], compress: true };

fs.createReadStream(inputFile).pipe(lessCssStream(inputFile, opts)).pipe(process.stdout);
```

## usage

### lessCssStream(file[, opts])

`file` - the less file to transform

`opts` - optional [options hash](http://lesscss.org/#using-less-configuration) passed through to `less.render`


## changelog

- **1.0.0** - updated included/dependent Less version to 2.x
