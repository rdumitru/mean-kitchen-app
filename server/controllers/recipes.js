//==============================================================================
// Requires.
//==============================================================================
var Recipe = require('mongoose').model('Recipe');

//==============================================================================
// Implementation and exports.
//==============================================================================
module.exports.getRecipes = function (req, res) {
    Recipe.find({}).exec(function (err, collection) {
        res.send(collection);
    });
};