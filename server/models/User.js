//==============================================================================
// Requires.
//==============================================================================
var mongoose    = require('mongoose'),
    encrypt     = require('../util/encryption'),
    timeStamp   = require('../util/timeStamp');

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
    roles: [String],
    updated: Date,
    created: Date
});

userSchema.pre('save', timeStamp.addTimeStamp);

userSchema.methods = {
    authenticate: function (passwordToMatch) {
        return encrypt.hashPassword(this.salt, passwordToMatch) === this.hashedPassword;
    },

    hasRole: function (role) {
        return this.roles.indexOf(role) >= 0;
    }
};

// Model.
var User = mongoose.model('User', userSchema);

function createDefaultUsers() {
    User.find({}).exec(function (err, collection) {
        if (collection.length <= 0) {
            console.log('Creating default users...');
            var salt, hash;

            salt = encrypt.createSalt();
            hash = encrypt.hashPassword(salt, 'admin');
            User.create({
                firstName: 'Admin',
                lastName: 'Smith',
                username: 'admin',
                salt: salt,
                hashedPassword: hash,
                roles: ['admin']
            });

            salt = encrypt.createSalt();
            hash = encrypt.hashPassword(salt, 'user');
            User.create({
                firstName: 'User',
                lastName: 'Smith',
                username: 'user',
                salt: salt,
                hashedPassword: hash,
                roles: []
            });
        }
    });
}
//==============================================================================
// Exports.
//==============================================================================
module.exports.createDefaultUsers = createDefaultUsers;

