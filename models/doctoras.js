const { Schema, model} = require('mongoose');
const DoctoraSchema = Schema({
    doctora: {
        type: String,
        required: [true, 'el nombre de la doctora es necesario'],
    },
    numeromovil: {
        type: String,
        required: [true],
    },
    reservations: [{ type: Schema.Types.ObjectId, ref: 'Reservation' }]
});


module.exports = model('Doctora', DoctoraSchema);