const mongoose = require('mongoose');
const schema = mongoose.Schema;

var leadersSchema = new schema({
    name: {
        required: true,
        type: String,
        unique: true
    },
    image: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    abbr: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true

    },
    featured: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

var leaders = mongoose.model('leader' , leadersSchema);
module.exports = leaders ;
