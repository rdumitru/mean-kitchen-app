//==============================================================================
// Requires.
//==============================================================================
var mongoose = require('mongoose');

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

    // Schemas.
    var userSchema = mongoose.Schema({
        firstName: String,
        lastName: String,
        userName: String
    });

    var User = mongoose.model('User', userSchema);

    User.find({}).exec(function (err, collection) {
        if (collection.length <= 0) {
            User.create({
                firstName: 'Remus',
                lastName: 'Dumitru',
                userName: 'remus'
            });

            User.create({
                firstName: 'Irina',
                lastName: 'Predut',
                userName: 'irina'
            });

            User.create({
                firstName: 'Gelu',
                lastName: 'Papagal',
                userName: 'gelu'
            });
        }
    });
};