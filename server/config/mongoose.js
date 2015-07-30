//==============================================================================
// Requires.
//==============================================================================
var mongoose    = require('mongoose'),
    userModel   = require('../models/User');

//==============================================================================
// Exports.
//==============================================================================
module.exports = function (config) {
    mongoose.connect(config.dbConnStr);
    var db = mongoose.connection;

    db.on('error', console.error.bind(console, 'MongoDB connection error...'));
    db.once('open', function () {
        console.log('MongoDB connection successful...');
    });

    userModel.createDefaultUsers();
};
