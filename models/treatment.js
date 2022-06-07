const { Schema, model } = require("mongoose");
const treatmentSchema = Schema({
  treatment: {
    type: String,
    required: [true],
  },
  total: {
    type: Number,
    required: [true, "el total es necesario"],
  },
});

module.exports = model("Treatment", treatmentSchema);
