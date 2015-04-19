module.exports = {

  friendlyName: 'Create write',
  description: 'Create Write Stream',
  extendedDescription: '',

  sync: true,

  inputs: {
    "stream": {
      "friendlyName": "stream",
      "description": "A readable stream",
      "example": 'a stream',
      "required": false,
      "name": "stream"
    },
    "path": {
      "friendlyName": "path",
      "description": "A destination path file",
      "example": 'tmp.log',
      "required": false,
      "type": "string",
      "name": "path"
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
        return require('fs').createWriteStream(process.stdout);
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
    try {
      return exits.success( (inputs.stream||process.stdin).pipe(require('fs').createWriteStream(inputs.path||process.stdout)) );
    } catch (err) {
      return exits.error(err);
    }
  },

};
