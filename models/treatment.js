const { Schema, model } = require("mongoose");
const treatmentSchema = Schema({
  name: {
    type: String,
    required: [true],
  },
  total: {
    type: Number,
  },
});

module.exports = model("Treatment", treatmentSchema);
