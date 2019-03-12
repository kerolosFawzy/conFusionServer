var mongoose = require('mongoose');
var schema = mongoose.Schema;


// var dishSchema = new schema({
//     dishId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Dishes',
//         unique: true
//     }
// }, {
//     timestamps: true
// });

var favouriteSchema = new schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        unique: true
    },
    dishes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dishes'
    }]
}, {
    timestamps: true
});

var Favorites = mongoose.model('Favorites', favouriteSchema);
module.exports = Favorites;