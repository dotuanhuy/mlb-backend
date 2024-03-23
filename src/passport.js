require('dotenv').config()
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const db = require('./models/index')
const {signRefreshToken} = require('./config/jwt')

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/v1/auth/google/callback"
},
    async function (accessToken, refreshToken, profile, cb) {
        try {
            return cb(null, profile)
        } catch (e) {
            console.log(e)
        }
    }
));

// passport.use(new FacebookStrategy({
//     clientID: process.env.FACEBOOK_APP_ID,
//     clientSecret: process.env.FACEBOOK_APP_SECRET,
//     callbackURL: "http://localhost:3000/auth/facebook/callback"
// },
//     function (accessToken, refreshToken, profile, cb) {
//         // User.findOrCreate({ facebookId: profile.id }, function (err, user) {
//         //     return cb(err, user);
//         // });
//     }
// ));