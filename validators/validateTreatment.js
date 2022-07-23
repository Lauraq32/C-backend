const { validations } = require("../middlewares/validations");
const { check } = require("express-validator");

const validateTreatment = [
  check("treatment", "treatment is required").not().isEmpty(),
  check("total", "total is required").not().isEmpty(),
  validations
];

module.exports = validateTreatment;