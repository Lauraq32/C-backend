const { Schema, model} = require('mongoose');
const PagoSchema = Schema({
    doctor: { type: Schema.Types.ObjectId, ref: "Doctor" },
    amount: {
        type: Number,
        required: [true, 'la cantidad del producto es necesaria'],
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


module.exports = model('Pago', PagoSchema);