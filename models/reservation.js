const { Schema, model} = require('mongoose');
const ReservationSchema = Schema({
    concept: {
        type: String,
    },
    phone: {
        type: String,
        required: [true],
    },
    date: {
        type: Date,
        required: [true, 'la fecha es necesaria'],
    },
    amountpayable: {
        type: Number,
    },
    paymenttype: {
        type: String,
    },
    doctor: { type: Schema.Types.ObjectId, ref: "Doctor" },
    client: { type: Schema.Types.ObjectId, ref: 'Client' },
    patientTreatment: { type: Schema.Types.ObjectId, ref: 'patientTreatment' },
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    percent: {
        type: Number,
    },
});

module.exports = model('Reservation', ReservationSchema);