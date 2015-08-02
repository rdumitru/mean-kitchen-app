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
    ingredients: [{
        quantity: String,
        name: String,
        isMain: Boolean
    }],
    url: String,
    updated: Date,
    created: Date
});

recipeSchema.pre('save', timeStamp.addTimeStamp);

// Model.
var Recipe = mongoose.model('Recipe', recipeSchema);

function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

function createDefaultRecipes() {
    var chickenUrl = 'http://www.morrisonsmag.co.uk/system/media/serve/morrisonsmag/september_2013/lemon_and_thyme_chicken/thumbcover.jpg';
    var saladUrl = 'http://www.toppingexpectations.com/images/caesar-salad.jpg';
    var beefUrl = 'http://blog.zisboombah.com/wp-content/uploads/beef-stroganoff.jpg';

    var lemonChicken = {
        name: 'Lemon Chicken',
        ingredients: [{
            quantity: 4,
            name: 'Chicken Breast',
            isMain: true
        }, {
            quantity: '1 tablespoon',
            name: 'Thyme',
            isMain: true
        }, {
            quantity: 1,
            name: 'Lemon',
            isMain: true
        }],
        url: chickenUrl
    };

    var caesarSalad = {
        name: 'Caesar Salad',
        ingredients: [{
            quantity: 1,
            name: 'Lettuce',
            isMain: true
        }, {
            quantity: '200 grams',
            name: 'Croutons',
            isMain: true
        }, {
            quantity: '1 ounce',
            name: 'Parmesan Cheese',
            isMain: true
        }],
        url: saladUrl
    };

    var beefStroganoff = {
        name: 'Beef Stroganoff',
        ingredients: [{
            quantity: '1 kg',
            name: 'Beef',
            isMain: true
        }, {
            quantity: '500 grams',
            name: 'Mushrooms',
            isMain: true
        }, {
            quantity: '1/2 jar',
            name: 'Mustard',
            isMain: true
        }],
        url: beefUrl
    };

    Recipe.find({}).exec(function (err, collection) {
        if (collection.length <= 0) {

            for(var i = 0; i < 23; i++) {
                var recipe = null;
                switch (i % 3) {
                    case 0:
                        recipe = clone(lemonChicken);
                        break;
                    case 1:
                        recipe = clone(caesarSalad);
                        break;
                    case 2:
                        recipe = clone(beefStroganoff);
                        break;
                }

                recipe.name += ' ' + i.toString();
                recipe.time = 10 * i;

                Recipe.create(recipe);
            }
        }
    });
}

//==============================================================================
// Exports.
//==============================================================================
module.exports.createDefaultRecipes = createDefaultRecipes;