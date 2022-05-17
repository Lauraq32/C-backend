// esto sera de mi tarea... 

// defino el schema.
const { Schema, model} = require('mongoose');
const TratamientoSchema = Schema({
    tratamiento: {
        type: String,
        required: [true, 'el tratamiento es necesario'],
    },
    total: {
        type: Number,
        required: [true, 'el total es necesario'],
    },
    reservations: [{ type: Schema.Types.ObjectId, ref: 'Reservation' }],
    consultas: [{ type: Schema.Types.ObjectId, ref: 'Consulta' }]
});

module.exports = model('Tratamiento', TratamientoSchema);

//debo de hacer una relacion de los tratamiento con la reserva.

//debo de calcular el tiempo(aproximado) del tratamiento.

//acomodar el codigo de una mejor forma.



