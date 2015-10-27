const fs = require('fs'), filename = process.argv[2];

if (!filename) { // if file name isn't givent as command line argument
  throw Error("A file to watch must be specified!");
}

fs.watch(filename, function() { // watch file for changes made
  console.log("File " + filename + " just changed!");
});

console.log("Now watching " + filename + " for changes...");
