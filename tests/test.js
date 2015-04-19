var should = require('should');
var stream = require("../index.js");

describe('readStream and write Stream', function(){
  it('should be done and copy README.md file', function(done){
    var input = stream.createRead({path: 'README.md'}).execSync();
    var output = stream.createWrite({path: 'README2.md'}).execSync();
    input.pipe( output ).on('close', done);
  });
});
