//==============================================================================
// Requires.
//==============================================================================
var mongoose    = require('mongoose'),
    crypto      = require('crypto');

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
        userName: String,
        salt: String,
        hashedPassword: String,
        roles: [String]
    });

    userSchema.methods = {
        authenticate: function (passwordToMatch) {
            return hashPassword(this.salt, passwordToMatch) === this.hashedPassword;
        }
    };

    var User = mongoose.model('User', userSchema);

    User.find({}).exec(function (err, collection) {
        if (collection.length <= 0) {
            var salt, hash;

            salt = createSalt();
            hash = hashPassword(salt, 'remus');
            User.create({
                firstName: 'Remus',
                lastName: 'Dumitru',
                userName: 'remus',
                salt: salt,
                hashedPassword: hash,
                roles: ['admin']
            });

            salt = createSalt();
            hash = hashPassword(salt, 'irina');
            User.create({
                firstName: 'Irina',
                lastName: 'Predut',
                userName: 'irina',
                salt: salt,
                hashedPassword: hash,
                roles: []
            });

            salt = createSalt();
            hash = hashPassword(salt, 'gelu');
            User.create({
                firstName: 'Gelu',
                lastName: 'Papagal',
                userName: 'gelu',
                salt: salt,
                hashedPassword: hash
            });
        }
    });
};

//==============================================================================
// Private functions.
//==============================================================================
function createSalt() {
    return crypto.randomBytes(128).toString('base64');
}

function hashPassword(salt, password) {
    var hmac = crypto.createHmac('sha1', salt);
    return hmac.update(password).digest('hex');
}