/***
 * Excerpted from "Node.js the Right Way",
 * published by The Pragmatic Bookshelf.
 * Copyrights apply to this code. It may not be used to create training material,
 * courses, books, articles, and the like. Contact us if you are in doubt.
 * We make no guarantees that this code is fit for any purpose.
 * Visit http://www.pragmaticprogrammer.com/titles/jwnode for more book information.
***/
'use strict';
const
  fs = require('fs'),
  cheerio = require('cheerio');

module.exports = function(filename, callback) { // client calls rdf-parser(file, callbackFunction);
  fs.readFile(filename, function(err, data) {
    if (err) { return callback(err); }
    let
      $ = cheerio.load(data.toString()), // split up/load data
      collect = function(index, elem) {
        return $(elem).text();
      };

      // converting xml data into json data for CouchDB
      // insert null for error argument
    callback(null, { // inserting this JSON data into given callback function
      _id: $('pgterms\\:ebook').attr('rdf:about').replace('ebooks/', ''),
      title: $('dcterms\\:title').text(),
      authors: $('pgterms\\:agent pgterms\\:name').map(collect),
      subjects: $('[rdf\\:resource$="/LCSH"] ~ rdf\\:value').map(collect)
    });
  });
};
