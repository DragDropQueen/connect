var passport = require('./passport');
var User = require('./user');

module.exports = function (app) {
  
  app.get('/', function(req, res){
    res.render('index', { user: req.user });
  });

  app.get('/account', ensureAuthenticated, function(req, res){
    res.render('account', { user: req.user });
  });

  app.post('/account', ensureAuthenticated, function (req, res) {
    User.update(req.user.login, req.body, function (err, user) {
      res.redirect('/account');
    });
  });

  app.get('/account.json', ensureAuthenticated, function(req, res){
    res.json(req.user);
  });

  app.get('/edit', ensureAuthenticated, function(req, res){
    res.render('edit', {user: req.user});
  });

  app.get('/auth/github',
    passport.authenticate('github'),
    function(req, res){
      // The request will be redirected to GitHub for authentication, so this
      // function will not be called.
    });

  app.get('/auth/github/callback', 
    passport.authenticate('github', { failureRedirect: '/' }),
    function(req, res) {
      res.redirect('/account');
    });

  app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });

  function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/')
  }
  
};