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

describe('Replace', function(){
  it('should be done and copy README.md and replace some content inside', function(done){
    var input = stream.createRead({path: 'README.md'}).execSync();
    var output = stream.createWrite({path: 'README.md.replace.md'}).execSync();
    input
      .pipe( stream.replace({search:'Usage', replace:'__Usage__'}).execSync() )
      .pipe( output )
      .on('close', done);
  });
  it('should be done and copy README.md and replace some content inside', function(done){
    var input = stream.createRead({path: 'README.md'}).execSync();
    var output = stream.createWrite({path: 'README.md.replace.2.md'}).execSync();
    input
      .pipe( stream.replace({search:'Usage'}).execSync() )
      .pipe( output )
      .on('close', done);
  });
  it('should be done and copy README.md and replace some content inside', function(done){
    var input = stream.createRead({path: 'README.md'}).execSync();
    var output = stream.createWrite({path: 'README.md.replace.3.md'}).execSync();
    input
      .pipe( stream.replace({search:['Usage','stream'], replace:'Mike'}).execSync() )
      .pipe( output )
      .on('close', done);
  });
  it('should be done and copy README.md and replace some content inside', function(done){
    var input = stream.createRead({path: 'README.md'}).execSync();
    var output = stream.createWrite({path: 'README.md.replace.4.md'}).execSync();
    input
      .pipe( stream.replace({search:['wi2','bug','node','stream'], replace: "Mike"}).execSync() )
      .pipe( output )
      .on('close', done);
  });

});

describe('Insert', function(){
  it('should be done and copy README.md and insert some content inside', function(done){
    var input = stream.createRead({path: 'README.md'}).execSync();
    var output = stream.createWrite({path: 'README.md.insert.md'}).execSync();
    input
      .pipe( stream.insert({text:' of Mike', after:'Usage'}).execSync() )
      .pipe( output )
      .on('close', done);
  });
  it('should be done and copy README.md and insert some content inside', function(done){
    var input = stream.createRead({path: 'README.md'}).execSync();
    var output = stream.createWrite({path: 'README.md.insert.2.md'}).execSync();
    input
      .pipe( stream.insert({text:'Mike and ', before:'Usage'}).execSync() )
      .pipe( output )
      .on('close', done);
  });
  it('should be done and copy README.md and insert some content inside', function(done){
    var input = stream.createRead({path: 'README.md'}).execSync();
    var output = stream.createWrite({path: 'README.md.insert.3.md'}).execSync();
    input
      .pipe( stream.insert({text:' [Mike] ', after:'stream'}).execSync() )
      .pipe( output )
      .on('close', done);
  });
});

describe('Replace and Insert', function(){
  it('should be done and copy README.md and insert some content inside', function(done){
    var input = stream.createRead({path: 'README.md'}).execSync();
    var output = stream.createWrite({path: 'README.md.insert.replace.md'}).execSync();
    var stream1 = stream.insert({before:['Usage', 'wi2', 'bug'], text:"[YES]"}).execSync();
    var stream2 = stream.replace({search:['node','pack'], replace:"[NO]"}).execSync();
    input
      .pipe( stream1 )
      .pipe( stream2 )
      .pipe( output )
      .on('close', done);
  });
  it('should be done and copy README.md and insert some content inside', function(done){
    var input = stream.createRead({path: 'README.md'}).execSync();
    var output = stream.createWrite({path: 'README.md.replace.insert.html'}).execSync();
    var stream1 = stream.insert({before:['Usage', 'wi2', 'bug'], text:"[YES]"}).execSync();
    var stream2 = stream.replace({search:['node','pack'], replace:"[NO]"}).execSync();
    input
      .pipe( stream1 )
      .pipe( stream2 )
      .pipe( stream.md().execSync() )
      .pipe( output )
      .on('close', done);
  });

});


describe('ToString() method', function(){
  it('should be done and return a string', function(done){
    var input = stream.createRead({path: 'README.md'}).execSync();
    var output = stream.stringify({stream:input}).exec(function (err, data) {
      // console.log(err,data);
      should (typeof data).be.equal('string');
      done();
    });
  });
  it('should be done and return a string', function(done){
    var input = stream.createRead({text: 'A simple content'}).execSync();

    var output = stream.stringify({stream:input.pipe( stream.md().execSync() )}).exec(function (err, data) {
      // console.log(err,data);
      should (typeof data).be.equal('string');
      done();
    });
  });
  it('should be done and return a string', function(done){
    var input = stream.createRead({text: 'A simple content'}).execSync();

    var output = stream.stringify({write:'README.md.stringwrite', stream:input.pipe( stream.md().execSync() )}).exec(function (err, data) {
      // console.log(err,data);
      should (typeof data).be.equal('string');
      done();
    });
  });
});




