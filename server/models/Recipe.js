//==============================================================================
// Requires.
//==============================================================================
var mongoose    = require('mongoose'),
    timeStamp   = require('../util/timeStamp');

//==============================================================================
// Implementation.
//==============================================================================

// Schema.
var requiredStr = '{PATH} is required!';
var recipeSchema = mongoose.Schema({
    name: {
        type: String,
        required: requiredStr
    },
    time: {
        type: Number,
        required: requiredStr
    },
    ingredients: [String],
    updated: Date,
    created: Date
});

recipeSchema.pre('save', timeStamp.addTimeStamp);

// Model.
var Recipe = mongoose.model('Recipe', recipeSchema);

function createDefaultRecipes() {
    Recipe.find({}).exec(function (err, collection) {
        if (collection.length <= 0) {
            Recipe.create({
                name: 'Steak',
                time: 30,
                ingredients: ['meat', 'salt']
            });

            Recipe.create({
                name: 'Soup',
                time: 60,
                ingredients: ['chicken', 'salt', 'vegetables']
            });

            Recipe.create({
                name: 'Pizza',
                time: 15,
                ingredients: ['flour', 'ham', 'tomatoes']
            });
        }
    });
}

//==============================================================================
// Exports.
//==============================================================================
module.exports.createDefaultRecipes = createDefaultRecipes;