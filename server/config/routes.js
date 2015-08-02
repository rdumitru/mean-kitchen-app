//==============================================================================
// Requires.
//==============================================================================
var mongoose    = require('mongoose')
    auth        = require('./auth'),
    users       = require('../controllers/users'),
    recipes     = require('../controllers/recipes'),
    User        = mongoose.model('User');

//==============================================================================
// HTTP server route handling.
//==============================================================================
module.exports = function (app) {
    // Users.
    app.get('/api/users', auth.requiresRole('admin'), users.getUsers);
    app.post('/api/users', users.createUser);
    app.put('/api/users', users.updateUser);

    // Recipes.
    app.get('/api/recipes', recipes.getRecipes);
    app.get('/api/recipes/:id', recipes.getRecipeById);

    // Partials.
    app.get('/partials/*', function (req, res) {
        var path = '../../public/app/' + req.params[0];
        res.render(path);
    });

    // Account.
    app.post('/login', auth.authenticate);

    app.post('/logout', function (req, res) {
        req.logout();
        res.end();
    });

    // Handle all other API calls.
    app.all('/api/*', function (req, res) {
        res.send(404);
    });

    // General.
    app.get('*', function (req, res) {
        res.render('index', {
            bootstrappedUser: req.user
        });
    });
};