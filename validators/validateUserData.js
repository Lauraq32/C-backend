const { validations } = require("../middlewares/validations");
const { check } = require("express-validator");
const User = require("../models/user");



const validateUserData = [
  check("name", "El nombre es necesario").not().isEmpty(),
  check("lastname", "El apellido es necesario").not().isEmpty(),
  check("role", "El rol es necesario").not().isEmpty(),
  check("email", "El correo es necesario").not().isEmpty(),
  check("password", "La contraseña es necesaria").not().isEmpty(),
  check('password', 'la contraseña debe tener minimo 6 caracteres').isLength({ min: 6 }),
  validations
];

module.exports = validateUserData;