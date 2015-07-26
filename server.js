//==============================================================================
// Node.js requires.
//==============================================================================
var express     = require('express'),
    stylus      = require('stylus'),
    logger      = require('morgan'),
    bodyParser  = require('body-parser'),
    mongoose    = require('mongoose');

//==============================================================================
// Environment variable.
//==============================================================================
var env = process.env.NODE_ENV = (process.env.NODE_ENV || 'development');
console.log('Mode: ' + env.toUpperCase() + '...');

//==============================================================================
// App config.
//==============================================================================
var app = express();

// Jade config.
app.set('views', __dirname + '/server/views');
app.set('view engine', 'jade');
if (env === 'development') {
    app.set('view options', { pretty: true });
}

// Body parser config.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Stylus config.
var compile = function (str, path) {
    return stylus(str).set('filename', path);
};

app.use(stylus.middleware({
    src: __dirname + '/public',
    compile: compile
}));

// Logger config.
app.use(logger('dev'));

// Static files config.
app.use(express.static(__dirname + '/public'));

// MongoDB config.
if (env === 'development') {
    mongoose.connect('mongodb://localhost/kitchen');
} else {
    mongoose.connect('mongodb://user:password@ds055762.mongolab.com:55762/kitchen');
}

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error...'));
db.once('open', function () {
    console.log('MEAN Kitchen DB opened...');
});

//==============================================================================
// Route handling.
//==============================================================================
app.get('/partials/:partialPath', function (req, res) {
    res.render('partials/' + req.params.partialPath);
});

app.get('*', function (req, res) {
    res.render('index', {});
});

//==============================================================================
// Listen.
//==============================================================================
var port = process.env.PORT || 3030;
app.listen(port, function () {
    console.log('Listening on port ' + port + '...');
});
