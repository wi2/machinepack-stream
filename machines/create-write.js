module.exports = {

  friendlyName: 'Create write',
  description: 'Create Write Stream',
  extendedDescription: '',

  sync: true,

  inputs: {
    "stream": {
      "friendlyName": "stream",
      "description": "A readable stream",
      "typeclass": "*",
      "required": false,
      "name": "stream"
    },
    "path": {
      "friendlyName": "path",
      "description": "A destination path file",
      "example": 'tmp.log',
      "required": true,
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
      "example": {
        "_writableState": {},
        "writable": true,
        "domain": null,
        "_events": {},
        "_maxListeners": 10,
        "path": ".tmp/test.txt",
        "fd": 25,
        "flags": "w",
        "mode": 438,
        "bytesWritten": 0
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
      return exits.success( (inputs.stream||process.stdin).pipe(require('fs').createWriteStream(inputs.path)) );
    } catch (err) {
      return exits.error(err);
    }
  },

};
