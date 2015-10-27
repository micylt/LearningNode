"use strict"; // catches more errors
const fs = require('fs'),
  spawn = require('child_process').spawn, // grabbing spawn function from 'child_process' module
  filename = process.argv[2];

if (!filename) {
  throw Error("A file to watch must be specified!");
}

fs.watch(filename, function() {
  // child process
  let ls = spawn('ls', ['-lh', filename]); // invoke ls -lh "filename" terminal command (gives us more info about file being changed)
  ls.stdout.pipe(process.stdout); // standard output from the child process to our own output
});

console.log("Now watching " + filename + " for changes...");
