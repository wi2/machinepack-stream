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
    else {
      if (!inputs.text)
        inputs.text = '';
      var stream = new (require('stream'))();
      stream.on('data', function(data) {
        process.stdout.write(data);
      });
      stream.emit('data', inputs.text);
    }
    try {
      return exits.success(inputs.path
                          ?
                          require('fs').createReadStream(inputs.path)
                          :
                          stream);
    } catch (err) {
      return exits.error(err);
    }
  },

};
