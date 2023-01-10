const { Schema, model } = require("mongoose");

const schema = Schema({
  status: {
    type: String,
    default: 'activo',
    enum: ['suspendido', 'completado', 'activo']
},
  treatment: [{type: Schema.Types.ObjectId, ref: 'Treatment'}],
  patient: { type: Schema.Types.ObjectId, ref: 'Patient' },
  reservations: [{ type: Schema.Types.ObjectId, ref: "Reservation" }],
});

module.exports = model("patientTreatment", schema);

 

