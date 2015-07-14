module.exports = {


  friendlyName: 'Insert',
  description: 'Insert content before or after a string',
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
    "text": {
      "friendlyName": "text",
      "description": "Insert a string before of after a string",
      "example": "a string to insert",
      "required": true,
      "name": "text"
    },
    "after": {
      "friendlyName": "after",
      "description": "a string or string's array to search and insert text after",
      "typeclass": "*",
      "required": false,
      "name": "after"
    },
    "before": {
      "friendlyName": "before",
      "description": "a string or string's array to search and insert text before",
      "typeclass": "*",
      "required": false,
      "name": "before"
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

    var Transform = require('stream').Transform
      , util = require('util');

    var InsertStream = function() {
      if ( !(this instanceof InsertStream) )
        return( new InsertStream() );
      Transform.call(this, {objectMode: true});
    };
    util.inherits(InsertStream, Transform);

    var transformer = function(str, val, by, before){
      var res = str+"";
      if (util.isArray(val)) {
        for(var i=0,len=val.length; i<len; i++){
          res = res.split(val[i]).join(
            before ? by + val[i] : val[i] + by
          );
        }
      } else
        res = res.split(val).join(before ? by + val : val + by);
      return res;
    }

    InsertStream.prototype._transform = function(chunk, encoding, callback) {
      var str = chunk.toString();
      if (inputs.before)
        str = transformer(str, inputs.before, inputs.text, true );
      if (inputs.after)
        str = transformer(str, inputs.after, inputs.text );
      this.push(str);
      callback();
    };

    try {
      return exits.success( inputs.stream ? inputs.stream.pipe(new InsertStream()) : new InsertStream())
    } catch (err) {
      return exits.error(err);
    }
  },

};
