const { validations } = require("../middlewares/validations");
const { check } = require("express-validator");

const validatePatient = [
  check("patient", "patient is required").not().isEmpty(),
  check("email", "email is required").not().isEmpty(),
  check("phone", "numeromovil is required").not().isEmpty(),
  validations
];

module.exports = validatePatient;