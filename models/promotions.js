const mongoose = require('mongoose');
const schema = mongoose.Schema;

require('mongoose_currency').loadType(mongoose);
const currency = mongoose.Types.Currency;

var promotionsSchema = new schema({
    name: {
        required: true,
        type: String,
        unique: true
    },
    image: {
        type: String,
        required: true
    },
    label: {
        type: String,
        default: ''
    },
    price: {
        type: currency,
        required: true,
        min: 0
    },
    description:{
        type:String,
                required: true

    },
    featured:{
        type: Boolean,
        default: false
    }
},{
    timestamps:true
});

var promotions = mongoose.model('promotion' , promotionsSchema);
module.exports = promotions ;


