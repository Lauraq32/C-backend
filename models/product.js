const { Schema, model} = require('mongoose');
const ProductSchema = Schema({
    name: {
        type: String,
        required: [true, 'el nombre del producto es necesario'],
    },
    amount: {
        type: Number,
    },
    price: {
        type: Number,
    },
    status: {
        type: String,
        default: 'lleno',
        enum: ['bajito', 'lleno']
    },
    date: {
        type: Date,
    },
});

module.exports = model('Product', ProductSchema);