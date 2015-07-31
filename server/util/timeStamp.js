//==============================================================================
// Exposed functions.
//==============================================================================
module.exports.addTimeStamp = function(next) {
    var currentDate = new Date();
    this.updated = currentDate;

    if (!this.created) {
        this.created = currentDate;
    }

    next();
};