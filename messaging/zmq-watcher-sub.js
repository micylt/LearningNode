/* zmq subscriber code
 * Even though this service uses TCP, we can’t simply use telnet to get
 * anything out of it. A ØMQ server requires a ØMQ client because of its
 * high-performance binary protocol.
 */
"use strict";
const
  zmq = require('zmq'),

  // create subscriber endpoint
  subscriber = zmq.socket('sub');

// subscribe to all messages. won't receive messages without this
subscriber.subscribe("");

// handle messages from publisher
subscriber.on("message", function(data) {
  let
    message = JSON.parse(data),
    date = new Date(message.timestamp);
  console.log("File '" + message.file + "' changed at " + date);
});

// connect to publisher
subscriber.connect("tcp://localhost:5432");
