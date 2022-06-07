const { Schema, model} = require('mongoose');
const ProductSchema = Schema({
    products: {
        type: String,
        required: [true, 'el nombre del producto es necesario'],
    },
    amount: {
        type: Number,
    },
    price: {
        type: Number, 
    },
});

module.exports = model('Product', ProductSchema);