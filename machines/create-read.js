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
    },
    "text": {
      "friendlyName": "text",
      "description": "A text",
      "example": 'lorem ipsum',
      "required": false,
      "type": "string",
      "name": "text"
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
    if (inputs.path && !require('fs').existsSync(inputs.path))
      return exits.pathError();
    else if (!inputs.text)
      inputs.text = '';

    try {
      return exits.success(
        inputs.path
        ?
        require('fs').createReadStream(inputs.path)
        :
        require('resumer')().queue(inputs.text).end()
      );
    } catch (err) { return exits.error(err); }
  },

};
