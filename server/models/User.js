//==============================================================================
// Requires.
//==============================================================================
var mongoose    = require('mongoose'),
    encrypt     = require('../util/encryption');

//==============================================================================
// Implementation.
//==============================================================================
// Schemas.
var requiredStr = '{PATH} is required!';
var userSchema = mongoose.Schema({
    firstName: { type: String, required: requiredStr },
    lastName: { type: String, required: requiredStr },
    username: {
        type: String,
        required: requiredStr,
        unique: true
    },
    salt: { type: String, required: requiredStr },
    hashedPassword: { type: String, required: requiredStr },
    roles: [String]
});

userSchema.methods = {
    authenticate: function (passwordToMatch) {
        return encrypt.hashPassword(this.salt, passwordToMatch) === this.hashedPassword;
    },

    hasRole: function (role) {
        return this.roles.indexOf(role) >= 0;
    }
};

var User = mongoose.model('User', userSchema);

function createDefaultUsers() {
    User.find({}).exec(function (err, collection) {
        if (collection.length <= 0) {
            var salt, hash;

            salt = encrypt.createSalt();
            hash = encrypt.hashPassword(salt, 'remus');
            User.create({
                firstName: 'Remus',
                lastName: 'Dumitru',
                username: 'remus',
                salt: salt,
                hashedPassword: hash,
                roles: ['admin']
            });

            salt = encrypt.createSalt();
            hash = encrypt.hashPassword(salt, 'irina');
            User.create({
                firstName: 'Irina',
                lastName: 'Predut',
                username: 'irina',
                salt: salt,
                hashedPassword: hash,
                roles: []
            });

            salt = encrypt.createSalt();
            hash = encrypt.hashPassword(salt, 'gelu');
            User.create({
                firstName: 'Gelu',
                lastName: 'Papagelu',
                username: 'gelu',
                salt: salt,
                hashedPassword: hash
            });
        }
    });
}
//==============================================================================
// Exports.
//==============================================================================
module.exports.createDefaultUsers = createDefaultUsers;

