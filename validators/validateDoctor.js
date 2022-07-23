const { validations } = require("../middlewares/validations");
const { check } = require("express-validator");

const validateDoctor = [
  check("doctor", "doctor is required").not().isEmpty(),
  check("phone", "numeromovil is required").not().isEmpty(),
  validations
];

module.exports = validateDoctor;