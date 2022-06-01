const { Schema, model } = require("mongoose");

const schema = Schema({
  treatment: {type: Schema.Types.ObjectId, ref: 'Treatment'},
  client: { type: Schema.Types.ObjectId, ref: 'Client' },
  reservations: [{ type: Schema.Types.ObjectId, ref: "Reservation" }],
});

module.exports = model("patientTreatment", schema);

 

