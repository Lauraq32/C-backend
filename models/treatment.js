const { Schema, model } = require("mongoose");
const treatmentSchema = Schema({
  treatment: {
    type: String,
    required: [true],
  },
  total: {
    type: Number,
    required: [true],
  },
});

module.exports = model("Treatment", treatmentSchema);
