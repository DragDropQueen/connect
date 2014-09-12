var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new GitHubStrategy({
    clientID: process.env['GITHUB_CLIENT_ID'],
    clientSecret: process.env['GITHUB_CLIENT_SECRET'],
    callbackURL: "http://localhost:3000/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    console.log(profile);
    return done(null, profile);
  }
));

module.exports = passport;