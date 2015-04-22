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
      "description": "Done.",
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
    var fs = require('fs'),
      util = require('util');
    if (inputs.path && !fs.existsSync(inputs.path))
      return exits.pathError();
    else if (!inputs.text)
      inputs.text = '';

    try {
      return exits.success(
        inputs.path
        ?
        fs.createReadStream(inputs.path)
        :
        require('resumer')().queue(inputs.text).end()
      );
    } catch (err) { return exits.error(err); }
  },

};
