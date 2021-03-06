module.exports = {

  friendlyName: 'Unzip',
  description: 'Unzip a stream',
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
    try {
      return exits.success( inputs.stream ? inputs.stream.pipe(require('zlib').createGunzip()) : require('zlib').createGunzip())
    } catch (err) {
      return exits.error(err);
    }
  },

};
