const { Schema, model} = require('mongoose');
const ClientesSchema = Schema({
    paciente: {
        type: String,
        required: [true, 'el nombre del paciente es necesario'],
    },
    numeromovil: {
        type: String,
        required: [true],
    },
    email: {
        type: String,
        required: [true],
    },
    status: {
        type: Boolean,
        default: true
    },
    reservations: [{ type: Schema.Types.ObjectId, ref: 'Reservation' }]
});

module.exports = model('Clientes', ClientesSchema);