var express = require('express');
var path = require('path');

var app = express();

app.use(express.static(path.join(__dirname, 'public')));

require('./lib/configuration')(app);
require('./lib/routes')(app);
require('./lib/error-handlers')(app);


module.exports = app;