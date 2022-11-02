const { validations } = require("../middlewares/validations");
const { check } = require("express-validator");
const User = require("../models/user");

const validateSignup = [
  check("name", "name is required").not().isEmpty(),
  check("lastname", "lastname is required").not().isEmpty(),
  check("role", "role is required").not().isEmpty(),
  check("email", "email is required").not().isEmpty(),
  check("password", "password is required").not().isEmpty(),
  check('password', 'La Contraseña debe de tener como minimo 6 caracteres').isLength({ min: 6 }),
  validations
];

module.exports = validateSignup;