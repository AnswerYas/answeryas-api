const passport = require('passport');
const Strategy = require('passport-http-bearer').Strategy;

const User = require('./models/member/user');
const config = require('./config');

module.exports = passport => {
  passport.use(
    new Strategy((token, done) => {
      console.log(token)
      User.findOne({token}, (err, user) => {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, {message: 'authentication invalid'});
        }
        return done(null, user);
      });
    })
  );
};
