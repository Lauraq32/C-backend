const { Schema, model} = require('mongoose');
const PatientSchema = Schema({
    name: {
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
        type: String,
        default: 'activo',
        enum: ['inactivo', 'activo']
    },
    reservations: [{ type: Schema.Types.ObjectId, ref: 'Reservation' }],
    patientTreatments: [{ type: Schema.Types.ObjectId, ref: 'patientTreatment' }]
});

module.exports = model('Patient', PatientSchema);