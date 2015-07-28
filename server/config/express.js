//==============================================================================
// Node.js requires.
//==============================================================================
var express     = require('express'),
    session     = require('express-session'),
    stylus      = require('stylus'),
    logger      = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser  = require('body-parser'),
    passport    = require('passport');

//==============================================================================
// Exports.
//==============================================================================
module.exports = function (app, config) {
    // Jade config.
    app.set('views', config.rootPath + '/server/views');
    app.set('view engine', 'jade');
    if (config.env === 'development') {
        app.set('view options', { pretty: true });
    }

    // Logger config.
    app.use(logger('dev'));

    // Cookie parser config.
    app.use(cookieParser());

    // Body parser config.
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    // Auth config.
    app.use(session({
        secret: 'MEAN kitchen',
        resave:false,
        saveUninitialized:false
    }));
    app.use(passport.initialize());
    app.use(passport.session());

    // Stylus config.
    var compile = function (str, path) {
        return stylus(str).set('filename', path);
    };

    app.use(stylus.middleware({
        src: config.rootPath + '/public',
        compile: compile
    }));

    // Static files config.
    app.use(express.static(config.rootPath + '/public'));
};