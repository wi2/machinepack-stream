var Transform = require('stream').Transform
  , util = require('util')

module.exports.simple = function (){
  var _fn, _opts;

  var MethodStream = function(fn, opts) {
    _fn = fn;
    _opts = opts||{};

    if ( !(this instanceof MethodStream) )
      return( new MethodStream() );
    Transform.call(this, {objectMode: true});
  };
  util.inherits(MethodStream, Transform);

  MethodStream.prototype._transform = function(chunk, encoding, callback) {
    this.push( _fn(chunk.toString()) );
    callback();
  };
  return MethodStream;
}
