const { Schema, model} = require('mongoose');
const ConsultaSchema = Schema({
    consulta: {
        type: String,
        required: [true, 'la consulta es necesaria'],
    },
    precio: {
        type: String,
        required: [true, 'el precio es necesario'],
    },
});

module.exports = model('Consulta', ConsultaSchema);