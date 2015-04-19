module.exports = {

  friendlyName: 'Create write',
  description: 'Create Write Stream',
  extendedDescription: '',

  sync: true,

  inputs: {
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
    success: {
      description: 'Done.',
      "getExample": function(inputs, env, input) {
        return require('fs').createWriteStream(inputs.path);
      },
      "isDefault": true,
      "hasDynamicOutputType": true,
      "name": "success",
      "friendlyName": "success"
    },

  },

  fn: function (inputs,exits) {
    try {
      return exits.success(require('fs').createWriteStream(inputs.path));
    } catch (err) {
      return exists.error(err);
    }
  },

};
