var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var handlebars = require('express-handlebars');

var passport = require('./lib/passport');

var app = express();

// View Engine Setup
app.engine('handlebars', handlebars({extname:'handlebars', defaultLayout:'layout'}));
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
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
  res.render('index', { user: req.user });
});

app.get('/account', ensureAuthenticated, function(req, res){
  res.render('account', { user: req.user });
});

app.get('/auth/github',
  passport.authenticate('github'),
  function(req, res){
    // The request will be redirected to GitHub for authentication, so this
    // function will not be called.
  });

app.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/account');
  });

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

require('./lib/error-handlers')(app);

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/')
}

module.exports = app;