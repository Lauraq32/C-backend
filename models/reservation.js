const { Schema, model} = require('mongoose');
const ReservationSchema = Schema({
    concept: {
        type: String,
    },
    phone: {
        type: String,
    },
    status: {
        type: String,
        default: 'pendiente',
        enum: ['completado', 'cancelado', 'pendiente']
    },
    date: {
        type: Date,
    },
    amountPayable: {
        type: Number,
    },
    paymentType: {
        type: String,
    },
    doctor: { type: Schema.Types.ObjectId, ref: "Doctor" },
    patient: { type: Schema.Types.ObjectId, ref: 'Patient' },
    patientTreatment: { type: Schema.Types.ObjectId, ref: 'patientTreatment' },
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    percent: {
        type: Number,
    },
});

module.exports = model('Reservation', ReservationSchema);