module.exports = {

  friendlyName: 'Create read',
  description: 'Create a read stream',
  extendedDescription: '',

  sync: true,

  inputs: {
    "path": {
      "friendlyName": "path",
      "description": "A path file",
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
    pathError: {
      description: 'File does not exist.',
    },
    success: {
      description: 'Done.',
      "getExample": function(inputs, env, input) {
        return require('fs').createReadStream(inputs.path);
      },
      "isDefault": true,
      "hasDynamicOutputType": true,
      "name": "success",
      "friendlyName": "success"
    },

  },

  fn: function (inputs,exits) {
    if (require('path').existsSync(inputs.path))
      return exits.success(require('fs').createReadStream(inputs.path));
    else
      return exits.pathError();
  },

};
