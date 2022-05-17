const { Schema, model} = require('mongoose');
const ProductosSchema = Schema({
    productos: {
        type: String,
        required: [true, 'el nombre del producto es necesario'],
    },
    cantidad: {
        type: Number,
    },
    precio: {
        type: Number, 
    },
});

module.exports = model('Productos', ProductosSchema);