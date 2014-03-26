var through = require( "through" );
var sass = require( "node-sass" );
var path = require( "path" );

module.exports = function( file, opts ) {
	var data = "";
	if( file !== undefined && path.extname( file ) !== ".scss" )
		return through();
	else
		return through( write, end );

	function write(buf) {
		data += buf;
	}

	function end() {
		this.queue( sass.renderSync( data, opts ) );
		this.queue( null );
	}
};