module.exports = {


  friendlyName: 'Minify',
  description: 'Minify html',
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
      "getExample": function(inputs, env, input) {
        return require('fs').createReadStream(inputs.path||process.stdin);
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
      , minify = require('html-minifier').minify;

    var MinifyStream = function() {
      Transform.call(this, {objectMode: true});
    };
    util.inherits(MinifyStream, Transform);

    Transform.prototype._transform = function(chunk, encoding, callback) {
      this.push(minify(chunk.toString()));
      callback();
    };

    try {
      return exits.success( inputs.stream ? inputs.stream.pipe(new MinifyStream()) : new MinifyStream())
    } catch (err) {
      return exits.error(err);
    }
  },

};
