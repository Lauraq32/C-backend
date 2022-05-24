const { Schema, model } = require("mongoose");

const schema = Schema({
  tratamiento: {type: Schema.Types.ObjectId, ref: 'Tratamiento'},
  cliente: { type: Schema.Types.ObjectId, ref: 'Clientes' },
  reservations: [{ type: Schema.Types.ObjectId, ref: "Reservation" }],
});

module.exports = model("TratamientoPaciente", schema);

 

