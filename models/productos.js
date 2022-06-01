const { Schema, model} = require('mongoose');
const ProductosSchema = Schema({
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

module.exports = model('Productos', ProductosSchema);