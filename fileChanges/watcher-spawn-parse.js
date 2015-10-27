"use strict";
const
  fs = require('fs'),
  spawn = require('child_process').spawn,
  filename = process.argv[2];

if (!filename) {
  throw Error("A file to watch must be specified!");
}

fs.watch(filename, function() {
  let
    ls = spawn('ls', ['-lh', filename]), // info on file being changed.
    output = '';
  ls.stdout.on('data', function(chunk) {
    output += chunk.toString();
  });

  ls.on('close', function() { // EventEmitter class
    let parts = output.split(/\s+/);
    console.dir([parts[0], parts[4], parts[8]]); // permissions, size, and file name, respectively.
  });
});

console.log("Now watching " + filename + " for changes...");
