//==============================================================================
// Requires.
//==============================================================================
var auth        = require('./auth'),
    mongoose    = require('mongoose'),
    User        = mongoose.model('User');

//==============================================================================
// HTTP server route handling.
//==============================================================================
module.exports = function (app) {
    app.get('/api/users', auth.requiresRole('admin'), function(req, res) {
        User.find({}).exec(function (err, collection) {
            res.send(collection);
        });
    });

    app.get('/partials/*', function (req, res) {
        var path = '../../public/app/' + req.params[0];
        res.render(path);
    });

    app.post('/login', auth.authenticate);

    app.post('/logout', function (req, res) {
        req.logout();
        res.end();
    });

    app.get('*', function (req, res) {
        res.render('index', {
            bootstrappedUser: req.user
        });
    });
};