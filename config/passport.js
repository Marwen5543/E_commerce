const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../model/User');

passport.use(new LocalStrategy(
  async (username, password, done) => {
    try {
      const user = await User.getUserByUsername(username);

      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }

      if (!bcrypt.compareSync(password, user.h_password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.getUserById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

module.exports = passport;
