const GoogleStratergy = require('passport-google-oauth20').Strategy;
const keys = require('./keys');
const User = require('../models/User');
module.exports = function(passport){
  console.log("passport from config is called ")
  passport.use(
    new GoogleStratergy(
      {
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/signin-google',
        proxy: true
      },
      function(accessToken, refreshToken, profile, done){
        console.log(accessToken);
        console.log(profile);
        const image = profile.photos[0].value.substring(
          0,
          profile.photos[0].value.indexOf('?')
        );

        const newUser = {
          googleID: profile.id,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          email: profile.emails[0].value,
          image
        };

        User.findOne({googleID: profile.id})
          .then(user => {
            if(user){
              done(null, user)
            }else{
              new User(newUser).save().then(user => done(null, user));
            }
          })
      }
    )
  )
  passport.serializeUser((user, done) => {
    done(null, user.id)
  });

  passport.deserializeUser((id, done) => {
    User.findById(id).then(user => done(null, user))
  });
};
