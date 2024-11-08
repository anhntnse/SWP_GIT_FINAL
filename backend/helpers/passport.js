const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
require('dotenv').config();
const passport = require('passport');
const User = require('../models/userModel');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "https://swp-git-final.onrender.com/api",
},
    async function (accessToken, refreshToken, profile, cb) {

        // lưu thông tin user google trả về vào db
        // cb là callback
        try {
            const existingUser = await User.findOne({ oauthId: profile.id });
            if (!existingUser) {
                const existingEmail = await User.findOne({ email: profile.emails[0].value });
                if (existingEmail) {
                    // tìm và cập nhật user
                    const updatedUser = await User.findOneAndUpdate({ email: profile.emails[0].value }, {
                        oauthId: profile.id,
                        typeLogin: profile.provider,
                    },
                        { new: true });
                    console.log('updatedUser ', updatedUser);
                }
                else {
                    // tạo mới một user
                    await User.create({
                        oauthId: profile.id,
                        email: profile.emails[0].value,
                        typeLogin: profile.provider,
                    })
                }
            }
            // console.log('profile', profile);
            return cb(null, profile);
        } catch (error) {
            console.log(error);
        }
    }
));

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "https://swp-git-final.onrender.com/api",
    profileFields: ['displayName', 'email', 'photos', 'id']
},
    async function (accessToken, refreshToken, profile, cb) {

        try {
            const existingUser = await User.findOne({ oauthId: profile.id });
            if (!existingUser) {
                const existingEmail = await User.findOne({ email: profile.emails[0].value });
                if (existingEmail) {
                    // tìm và cập nhật user
                    await User.findOneAndUpdate({ email: profile.emails[0].value }, {
                        oauthId: profile.id,
                        typeLogin: profile.provider,
                    })
                }
                else {
                    // tạo mới một user
                    await User.create({
                        oauthId: profile.id,
                        email: profile.emails[0].value,
                        typeLogin: profile.provider,
                    })
                }
            }
            // console.log('existingEmail', existingEmail);
            // console.log('profile ', profile);
            return cb(null, profile);
        } catch (error) {
            console.log(error);
        }
    }

));

