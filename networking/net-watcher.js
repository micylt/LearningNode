'use strict';
const

  fs = require('fs'),
  net = require('net'),
  filename = process.argv[2],

  server = net.createServer(function(connection) { // process called when connection is created
    // reporting
    console.log('Subscriber connected.');
    connection.write(JSON.stringify({
    type: 'watching',
    file: filename
  }) + '\n');

    // watcher setup
    let watcher = fs.watch(filename, function() {
      connection.write(JSON.stringify({
      type: 'changed',
      file: filename,
      timestamp: Date.now()
      }) + '\n' );
    });

    // cleanup
    connection.on('close', function() {
      console.log('Subscriber disconnected.');
      watcher.close();
    });

  });

if (!filename) {
  throw Error('No target filename was specified.');
}

// here is the additional 'secret sauce' to clean up the socket
process.on('SIGINT', function() { // event when process receives a signal (SIGINT)
    console.log('\nClosing socket'); // i.e. ctrl c to cancel the connection
    server.close(function() {
        process.exit(1)
    });
});

server.listen('/tmp/watcher.sock', function() { // unix network socket
  console.log('Listening for subscribers...'); // nc -U /tmp/watcher.sock in shell to connect
});
