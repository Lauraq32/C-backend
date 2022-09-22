const { Schema, model } = require("mongoose");

const schema = Schema({
  status: {
    type: String,
    default: 'active',
    enum: ['suspended', 'completed', 'active']
},
  treatment: {type: Schema.Types.ObjectId, ref: 'Treatment'},
  patient: { type: Schema.Types.ObjectId, ref: 'Patient' },
  reservations: [{ type: Schema.Types.ObjectId, ref: "Reservation" }],
});

module.exports = model("patientTreatment", schema);

 

