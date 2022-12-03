import pkg from 'passport-google-oauth20';
const { Strategy: GoogleStrategy } = pkg;
import asyncHandler from 'express-async-handler';

import User from '../models/userModel.js';

export default function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/api/auth/google/callback',
      },
   asyncHandler(   async (accessToken, refreshToken, profile, done) => {
        const newUser = {
          googleId: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value,
        };
          let mailuser=await User.findOne({email:profile.emails[0].value})
          if(mailuser && !mailuser.googleId){
            
            throw new Error('you had used id and password method')
          }
        try {
          let user = await User.findOne({ googleId: profile.id });
          
          if (user) {
            done(null, user);
          } else {
            user = await User.create(newUser);
            done(null, user);
          }
        } catch (err) {
          console.error(err);
          
        throw new Error('Authentication Failed')
        }
      })
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user));
  });
}
