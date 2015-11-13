#!/usr/bin/env node --harmony
/***
the above command allows the script to be executed directly
 * Excerpted from "Node.js the Right Way"
***/
const
  request = require('request'),
  options = {
    method: process.argv[2] || 'GET',
    url: 'http://localhost:5984/' + (process.argv[3] || '')
  };
request(options, function(err, res, body) {
  if (err) {
    throw Error(err);
  } else {
    console.log(res.statusCode, JSON.parse(body));
  }
});
