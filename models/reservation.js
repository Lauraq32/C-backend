const { Schema, model} = require('mongoose');
const ReservationSchema = Schema({
    concepto: {
        type: String,
    },
    numeromovil: {
        type: String,
        required: [true],
    },
    fecha: {
        type: Date,
        required: [true, 'la fecha es necesaria'],
    },
    montoapagar: {
        type: Number,
        //required: [true, 'el total del tratamiento es necesario'],
    },
    tipodepago: {
        type: String,
        //required: [true, 'la forma de pago en necesaria'],
    },
    doctora: { type: Schema.Types.ObjectId, ref: "Doctora" },
    cliente: { type: Schema.Types.ObjectId, ref: 'Clientes' },
    tratamientoPaciente: { type: Schema.Types.ObjectId, ref: 'TratamientoPaciente' },
    porciento: {
        type: Number,
        //required: [true],
    },
});

module.exports = model('Reservation', ReservationSchema);