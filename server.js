//==============================================================================
// Node.js requires.
//==============================================================================
var express = require('express');

//==============================================================================
// Environment variable.
//==============================================================================
var env = process.env.NODE_ENV = (process.env.NODE_ENV || 'development');
console.log('Environment: ' + env.toUpperCase() + '...');

//==============================================================================
// App config.
//==============================================================================
var app = express();

// Global config.
var config = require('./server/config/config')[env];

// Express config.
require('./server/config/express')(app, config);

// Mongoose config.
require('./server/config/mongoose')(config);

// Passport config.
require('./server/config/passport')();

//==============================================================================
// Route handling.
//==============================================================================
require('./server/config/routes')(app);

//==============================================================================
// Listen.
//==============================================================================
app.listen(config.port, function () {
    console.log('Listening on port ' + config.port + '...');
});
