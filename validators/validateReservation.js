const { validations } = require("../middlewares/validations");
const { check } = require("express-validator");

const validateReservation = [
  check("concept", "concept is required").not().isEmpty(),
  validations
];

module.exports = validateReservation;