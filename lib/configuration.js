var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var handlebars = require('express-handlebars');

var passport = require('./passport');

module.exports = function (app) {
  
  app.engine('handlebars', handlebars({
    extname:'handlebars', 
    defaultLayout:'layout',
    helpers: require('./handlebars-helpers')
  }));
  app.set('view engine', 'handlebars');

  app.use(favicon());
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded());
  app.use(cookieParser());
  app.use(session({ 
    secret: process.env['CONTACT_INFO_SECRET'], 
    saveUninitialized: true,
    resave: true,
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  
};