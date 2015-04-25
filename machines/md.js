module.exports = {

  friendlyName: 'Md',
  description: 'Markdown',
  extendedDescription: '',

  sync: true,

  inputs: {
    "stream": {
      "friendlyName": "stream",
      "description": "A readable stream",
      "typeclass": "*",
      "required": false,
      "name": "stream"
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
      description: 'Done.',
      "example": {
        "_readableState": {},
        "readable": false,
        "domain": null,
        "_events": {},
        "_maxListeners": 10,
        "path": ".tmp/test.txt",
        "fd": null,
        "flags": "r",
        "mode": 438,
        "autoClose": true,
        "destroyed": true,
        "closed": true
      },
      "isDefault": true,
      "hasDynamicOutputType": true,
      "name": "success",
      "friendlyName": "success"
    },
  },

  fn: function (inputs,exits) {
    if (inputs.stream && require('isstream')(inputs.stream) !== true)
      return exits.errorNotStream({error: "It's not a valid stream"});

    var Transform = require('stream').Transform
      , util = require('util')
      , marked = require('marked');

    var MdStream = function() {
      if ( !(this instanceof MdStream) )
        return( new MdStream() );
      Transform.call(this, {objectMode: true});
    };
    util.inherits(MdStream, Transform);

    MdStream.prototype._transform = function(chunk, encoding, callback) {
      this.push(marked(chunk.toString()));
      callback();
    };

    try {
      return exits.success( inputs.stream ? inputs.stream.pipe(new MdStream()) : new MdStream())
    } catch (err) {
      return exits.error(err);
    }
  },



};
