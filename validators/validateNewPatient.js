const { check } = require("express-validator");

const validateNewPatient = [
  check("patient", "patient is required").not().isEmpty(),
  check("email", "email is required").not().isEmpty(),
  check("phone", "numeromovil is required").not().isEmpty(),
];

module.exports = validateNewPatient;