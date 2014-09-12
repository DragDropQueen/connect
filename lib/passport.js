var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;

var User = require('./user');

passport.serializeUser(function(user, done) {
  done(null, user.username);
});

passport.deserializeUser(function(username, done) {
  done(null, User.find(username));
});

passport.use(new GitHubStrategy({
    clientID: process.env['GITHUB_CLIENT_ID'],
    clientSecret: process.env['GITHUB_CLIENT_SECRET'],
    callbackURL: "http://localhost:3000/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    var user = User.findOrCreate(profile.username, profile);
    return done(null, user);
  }
));

module.exports = passport;