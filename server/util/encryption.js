//==============================================================================
// Requires.
//==============================================================================
var crypto = require('crypto');

//==============================================================================
// Exposed functions.
//==============================================================================
module.exports.createSalt = function() {
    return crypto.randomBytes(128).toString('base64');
};

module.exports.hashPassword = function(salt, password) {
    var hmac = crypto.createHmac('sha1', salt);
    return hmac.update(password).digest('hex');
};