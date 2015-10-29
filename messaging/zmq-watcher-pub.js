/* creating server connection with zmq
 * ØMQ does not do any formatting of messages itself— it is only interested
 * in pushing bytes down the wire. It’s our job to serialize and deserialize
 * any messages we send through ØMQ.
 */
'use strict';
const
  fs = require('fs'),
  zmq = require('zmq'),

  // create publisher endpoint
  publisher = zmq.socket('pub'), 

  filename = process.argv[2];

fs.watch(filename, function(){

  // send message to any subscribers
  publisher.send(JSON.stringify({
    type: 'changed',
    file: filename,
    timestamp: Date.now()
  }));
});

// listen on TCP port 5432
publisher.bind('tcp://*:5432', function(err) {
  console.log('Listening for zmq subscribers...');
});
