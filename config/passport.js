const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/Usermodel');

module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: '/api/auth/google/callback',
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log(profile);
        const newUser = {
          _id: profile.id,
          name: profile.displayName,
          password: generatePassword(),
        };
        try {
          let user = User.findOne({ _id: profile.id });

          if (user) {
            done(null, user);
          } else {
            user = await User.create(newUser);
            done(null, newUser);
          }
        } catch (err) {
          console.error(err);
        }
      }
    )
  );
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user));
  });
};

function generatePassword() {
  var length = 8,
    charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
    retVal = '';
  for (var i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
}
