var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;

var User = require('./user');

passport.serializeUser(function(user, done) {
  done(null, user.login);
});

passport.deserializeUser(function(username, done) {
  User.find(username, function (err, user) {
    done(null, user);
  });
});

passport.use(new GitHubStrategy({
    clientID: process.env['GITHUB_CLIENT_ID'],
    clientSecret: process.env['GITHUB_CLIENT_SECRET'],
    callbackURL: "http://localhost:3000/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate(profile.username, profile, function (err, user) {
      done(null, user);
    });
  }
));

module.exports = passport;