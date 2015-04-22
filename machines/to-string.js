module.exports = {

  friendlyName: 'To string',
  description: 'a toString method',
  extendedDescription: '',

  // sync: true,

  inputs: {
    "stream": {
      "friendlyName": "stream",
      "description": "A readable stream",
      "typeclass": "*",
      "required": true,
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
      "description": "Done.",
      "example": "a content text",
      "name": "success",
      "friendlyName": "success"
    },
  },

  fn: function (inputs,exits) {
    if (inputs.stream && require('isstream')(inputs.stream) !== true)
      return exits.errorNotStream({error: "It's not a valid stream"});

    var strm = inputs.stream || process.stdin
      , str = '';
    strm.on('data', function(chunk){
      if (chunk !== null) {
        str += chunk.toString();
      }
    });
    strm.on('end', function(){
      return exits.success( str );
    });
  },

};
