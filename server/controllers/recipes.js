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

module.exports.getRecipeById = function (req, res) {
    Recipe.findOne({ _id: req.params.id }).exec(function (err, recipe) {
        res.send(recipe);
    });
};

module.exports.toggleStarRecipe = function (req, res) {
    Recipe.findOne({ _id: req.params.id }).exec(function (err, recipe) {
        var userId = req.user._id;
        var index = recipe.starredByUsers.indexOf(userId);

        if (req.body.star && index < 0) {
            recipe.starredByUsers.push(userId);
        } else if (!req.body.star && index >= 0) {
            recipe.starredByUsers.splice(index, 1);
        }

        recipe.save(function (err) {
            if (err) {
                res.status(400);
                res.end();
            } else {
                res.send(recipe);
            }
        });
    });
};
