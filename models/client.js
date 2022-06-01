const { Schema, model} = require('mongoose');
const ClientSchema = Schema({
    patient: {
        type: String,
        required: [true, 'el nombre del paciente es necesario'],
    },
    phone: {
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

module.exports = model('Client', ClientSchema);