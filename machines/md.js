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
    pathError: {
      description: 'File does not exist.',
    },
    noStreamError: {
      description: 'does not exist.',
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
      , marked = require('marked');

    var MdStream = function() {
      Transform.call(this, {objectMode: true});
    };
    util.inherits(MdStream, Transform);

    Transform.prototype._transform = function(chunk, encoding, callback) {
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
