//==============================================================================
// Requires.
//==============================================================================
var auth = require('./auth');

//==============================================================================
// HTTP server route handling.
//==============================================================================
module.exports = function (app) {
    app.get('/partials/*', function (req, res) {
        var path = '../../public/app/' + req.params[0];
        res.render(path);
    });

    app.post('/login', auth.authenticate);

    app.get('*', function (req, res) {
        res.render('index');
    });
};