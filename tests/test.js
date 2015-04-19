var should = require('should');
var stream = require("../index.js");

describe('readStream and write Stream', function(){
  it('should be done and copy README.md file', function(done){
    var input = stream.createRead({path: 'README.md'}).execSync();
    var output = stream.createWrite({path: 'README.md.1'}).execSync();
    input
      .pipe( output )
      .on('close', done);
  });
  it('should be done and write content in file', function(done){
    var input = stream.createRead({text: 'A simple content'}).execSync();
    var output = stream.createWrite({path: 'README.md.2'}).execSync();
    input
      .pipe( output )
      .on('close', done);
  });
});
