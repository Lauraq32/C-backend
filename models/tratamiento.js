const { Schema, model } = require("mongoose");
const TratamientoSchema = Schema({
  tratamiento: {
    type: String,
    required: [true, "el tratamiento es necesario"],
  },
  total: {
    type: Number,
    required: [true, "el total es necesario"],
  },
});

module.exports = model("Tratamiento", TratamientoSchema);
