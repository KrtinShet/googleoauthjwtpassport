const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../model/userModel');
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_SECRET,
      callbackURL: 'http://localhost:5000/auth/google/redirect',
    },
    async (accessToken, refreshToken, profile, done) => {
      const user = await User.findOne({ googleId: profile.id });
      if (!user) {
        const newUser = await User.create({
          username: profile.displayName,
          googleId: profile.id,
          email: profile.emails[0].value,
        });
        return done(null, newUser);
      }
      done(null, user);
    }
  )
);
