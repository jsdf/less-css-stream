var lessCssStream = require( '../' );
var fs = require( 'fs' );
var path = require( 'path' );

var inputFile = path.join( __dirname, "sampleStyle.less" );

fs.createReadStream( inputFile ).pipe( lessCssStream( inputFile, { outputStyle : "compressed" } ) ).pipe( process.stdout );
