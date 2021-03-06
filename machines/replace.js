module.exports = {


  friendlyName: 'Replace',
  description: 'Search and replace',
  extendedDescription: '',

  sync: true,

  inputs: {
    "stream": {
      "friendlyName": "stream",
      "description": "A readable stream",
      "typeclass": "*",
      "required": false,
      "name": "stream"
    },
    "search": {
      "friendlyName": "search",
      "description": "A string or a string's array to search",
      "typeclass": "*",
      "required": true,
      "name": "search"
    },
    "replace": {
      "friendlyName": "replace",
      "description": "A string, replace",
      "example": "abc",
      "required": false,
      "name": "replace"
    }
  },

  defaultExit: 'success',

  exits: {
    error: {
      description: 'Unexpected error occurred.',
    },
    errorNotStream: {
      description: "It's not a valid stream"
    },
    success: {
      description: 'Done.'
    },
  },

  fn: function (inputs,exits) {
    if (inputs.stream && require('isstream')(inputs.stream) !== true)
      return exits.errorNotStream({error: "It's not a valid stream"});

    var Transform = require('stream').Transform
      , util = require('util');

    var ReplaceStream = function() {
      if ( !(this instanceof ReplaceStream) )
        return( new ReplaceStream() );
      Transform.call(this, {objectMode: true});
    };
    util.inherits(ReplaceStream, Transform);

    ReplaceStream.prototype._transform = function(chunk, encoding, callback) {
      if (util.isArray(inputs.search)) {
        var str = chunk.toString();
        for(var i=0,len=inputs.search.length; i<len; i++){
          str = str.split(inputs.search[i]).join(inputs.replace||"");
        }
        this.push(str);
      } else
        this.push(chunk.toString().split(inputs.search).join(inputs.replace||""));
      callback();
    };

    try {
      return exits.success( inputs.stream ? inputs.stream.pipe(new ReplaceStream()) : new ReplaceStream())
    } catch (err) {
      return exits.error(err);
    }
  },

};
