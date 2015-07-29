//==============================================================================
// Requires.
//==============================================================================
var passport = require('passport');

//==============================================================================
// Auth helpers.
//==============================================================================
module.exports.authenticate = function (req, res, next) {
    var auth = passport.authenticate('local', function (err, user) {
        if (err) { return next(err); }
        if (!user) { res.send({ success: false }); }

        req.logIn(user, function (err) {
            if (err) { return next(err); }
            res.send({
                success: true,
                user: user
            });
        });
    });

    auth(req, res, next);
};

module.exports.requiresApiLogin = function (req, res, next) {
    if (!req.isAuthenticated()) {
        res.status(403);
        res.end();
    } else {
        next();
    }
};

module.exports.requiresRole = function (role) {
    return function (req, res, next) {
        if (!req.isAuthenticated() || req.user.roles.indexOf(role) < 0) {
            res.status(403);
            res.end();
        } else {
            next();
        }
    }
};