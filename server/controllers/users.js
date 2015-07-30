//==============================================================================
// Requires.
//==============================================================================
var User    = require('mongoose').model('User')
    encrypt = require('../util/encryption');

//==============================================================================
// Exposed functions.
//==============================================================================
module.exports.getUsers = function(req, res) {
    User.find({}).exec(function (err, collection) {
        res.send(collection);
    });
};

module.exports.createUser = function (req, res, next) {
    var userData = req.body;
    console.log(userData);

    userData.username = userData.username.toLowerCase();
    userData.salt = encrypt.createSalt();
    userData.hashedPassword = encrypt.hashPassword(userData.salt, userData.password);
    
    User.create(userData, function (err, user) {
        if (err) {
            if (err.toString().indexOf('E11000') >= 0) {
                err = new Error('Username already exists.');
            }

            res.status(400);
            return res.send({ reason: err.toString() });
        }

        req.logIn(user, function (err) {
            if (err) { return next(err) }
            res.send(user);
        });
    });
};

module.exports.updateUser = function (req, res, next) {
    var userUpdates = req.body;

    if (req.user._id != userUpdates._id && !req.user.hasRole('admin')) {
        res.status(403);
        return res.end();
    }

    req.user.firstName = userUpdates.firstName;
    req.user.lastName = userUpdates.lastName;
    req.user.username = userUpdates.username;
    if (userUpdates.password && userUpdates.password.length >= 0) {
        req.user.salt = encrypt.createSalt();
        req.user.hashedPassword = encrypt.hashPassword(salt, userUpdates.password);
    }

    req.user.save(function (err) {
        if (err) {
            res.status(400);
            return res.send({ reason: err.toString() });
        }

        res.send(req.user);
    });
};