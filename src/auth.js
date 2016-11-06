'use strict';

var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;

class User {
    constructor(options) {
        this.username = options.username;
        this.password = options.password;
    }
}

module.exports.init = function init(options) {

    var config = options.config;

    passport.use(new BasicStrategy(
        function(username, password, done) {

            var user = new User({
                username: username,
                password: password
            });

            if(password === config.app.password) {
                done(null, user);
            } else {
                done(null, false);
            }
        }
    ));
};

module.exports.middleware = function middleware(options) {
    return passport.authenticate('basic', {session: false});
};
