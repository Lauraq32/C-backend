const { Schema, model} = require('mongoose');
const PaymentSchema = Schema({
    doctor: { type: Schema.Types.ObjectId, ref: "Doctor" },
    amount: {
        type: Number,
    },
    date: {
        type: Date,
    },
    status: {
        type: String,
        default: 'Pagado',
        enum: ['Pendiente', 'Pagado']
    },
});


module.exports = model('Payment', PaymentSchema);