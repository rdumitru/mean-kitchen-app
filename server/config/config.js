//==============================================================================
// Requires.
//==============================================================================
var path = require('path');

//==============================================================================
// Variables.
//==============================================================================
var rootPath = path.normalize(__dirname + '/../../');

//==============================================================================
// Exports.
//==============================================================================
module.exports = {
    development: {
        env: 'development',
        rootPath: rootPath,
        dbConnStr: 'mongodb://localhost/kitchen',
        port: process.env.PORT || 3030
    },
    production: {
        env: 'production',
        rootPath: rootPath,
        dbConnStr: 'mongodb://user:password@ds055762.mongolab.com:55762/kitchen',
        port: process.env.PORT || 80
    }
};