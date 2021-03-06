const { validations } = require("../middlewares/validations");
const { check } = require("express-validator");

const validateReservation = [
  check("phone", "numerovil is required").not().isEmpty(),
  check("concept", "concept is required").not().isEmpty(),
  check("date", "date is required").not().isEmpty(),
  check("amountpayable", "amountpayable is required").not().isEmpty(),
  check("paymenttype", "paymenttype is required").not().isEmpty(),
  validations
];

module.exports = validateReservation;