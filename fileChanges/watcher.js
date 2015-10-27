const fs = require('fs'); // const is a variable that cannot be re-assigned (constant)

fs.watch('target.txt', function() {
  console.log("File 'target.txt' just changed!");
});

console.log( "Now watching target.txt for changes..." );
