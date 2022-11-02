const { Schema, model} = require('mongoose');
const PatientSchema = Schema({
    name: {
        type: String,
        required: [true, 'el nombre del paciente es necesario'],
    },
    phone: {
        type: String,
    },
    email: {
        type: String,
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