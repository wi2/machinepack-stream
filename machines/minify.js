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
      description: 'Done.'
    },
  },

  fn: function (inputs,exits) {
    if (inputs.stream && require('isstream')(inputs.stream) !== true)
      return exits.errorNotStream({error: "It's not a valid stream"});

    var MinifyStream = require('../lib/stream-transformer.js').simple()
      , minify = require('html-minifier').minify;

    try {
      var mstream = new MinifyStream(minify);
      return exits.success( inputs.stream ? inputs.stream.pipe(mstream) : mstream);
    } catch (err) { return exits.error(err); }
  },

};
