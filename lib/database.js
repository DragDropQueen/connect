var cradle = require('cradle');
var util = require('util');

cradle.setup({
    host: util.format('http://%s:%s@turingschool.cloudant.com',
                      process.env['TURING_CONNECT_CLOUDANT_API_KEY'],
                      process.env['TURING_CONNECT_CLOUDANT_API_SECRET']),
    cache: true,
    raw: false,
    forceSave: true
  });
  
var couch = new(cradle.Connection);
var database = couch.database('connect');

module.exports = database;