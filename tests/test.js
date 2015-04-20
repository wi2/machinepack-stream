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

describe('zip / unzip stream', function(){
  it('should be done and zip a stream', function(done){
    var input = stream.createRead({path: 'README.md'}).execSync();
    var output = stream.createWrite({path: 'README.md.1.gz'}).execSync();
    input
      .pipe( stream.zip().execSync() )
      .pipe( output )
      .on('close', done);
  });
  it('should be done and unzip a stream', function(done){
    var input = stream.createRead({path: 'README.md.1.gz'}).execSync();
    var output = stream.createWrite({path: 'README.md.1.dezip'}).execSync();
    input
      .pipe( stream.unzip().execSync() )
      .pipe( output )
      .on('close', done);
  });

  it('should be done and zip a stream', function(done){
    var input = stream.createRead({path: 'README.md'}).execSync();
    var output = stream.createWrite({path: 'README.md.2.gz'}).execSync();
    stream.zip({stream: input}).execSync()
      .pipe( output )
      .on('close', done);
  });
  it('should be done and unzip a stream', function(done){
    var input = stream.createRead({path: 'README.md.2.gz'}).execSync();
    var output = stream.createWrite({path: 'README.md.2.dezip'}).execSync();
    stream.unzip({stream: input}).execSync()
      .pipe( output )
      .on('close', done);
  });
});

describe('Markdown', function(){
  it('should be done and copy README.md to html file', function(done){
    var input = stream.createRead({path: 'README.md'}).execSync();
    var output = stream.createWrite({path: 'README.md.html'}).execSync();
    input
      .pipe( stream.md().execSync() )
      .pipe( output )
      .on('close', done);
  });
});

describe('Minify', function(){
  it('should be done and copy README.md and minify it', function(done){
    var input = stream.createRead({path: 'README.md.html'}).execSync();
    var output = stream.createWrite({path: 'README.md.minify.html'}).execSync();
    input
      .pipe( stream.md().execSync() )
      .pipe( stream.minify().execSync() )
      .pipe( output )
      .on('close', done);
  });
});
