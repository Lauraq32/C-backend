const { validations } = require("../middlewares/validations");
const { check } = require("express-validator");

const validateProduct = [
  check("products", "products is required").not().isEmpty(),
  check("amount", "amount is required").not().isEmpty(),
  check("price", "price is required").not().isEmpty(),
  validations
];

module.exports = validateProduct;