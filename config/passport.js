const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user.model');
const config = require('../config/database');

module.exports = function(passport){

  let opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = config.secret;
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
      // console.log("Payload From Web: "+ JSON.stringify(jwt_payload));
      
    User.getUserById({_id: jwt_payload._id }, (err, user) => {
      if(err){
        return done(err, false);
      }
      if(user){
        // console.log("User from MongoDB: " + JSON.stringify(user));
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  }));
}