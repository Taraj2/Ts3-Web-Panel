﻿'use strict';
const User = require('../sequelize').models.user;
const localStrategy = require('./strategies/local');
const googleStrategy = require('./strategies/google');
const facebookStrategy = require('./strategies/facebook');

module.exports = function (passport) {

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id).then(user => {
            if (user) {
                done(null, user);
            } else {
                done(new Error("User doesn't exist"));
            }
        }).catch(err => {
            done(err);
        });
    });


    passport.use('register-local', localStrategy.register);
    passport.use('login-local', localStrategy.login);

    passport.use('connect-google', googleStrategy.connect);
    passport.use('login-google', googleStrategy.login);

    passport.use('connect-facebook', facebookStrategy.connect);
    passport.use('login-facebook', facebookStrategy.login);
};