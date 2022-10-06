const { validations } = require("../middlewares/validations");
const { check } = require("express-validator");
const User = require("../models/user");



const validateUserData = [
  check("name", "name is required").not().isEmpty(),
  check("lastname", "lastname is required").not().isEmpty(),
  check("role", "role is required").not().isEmpty(),
  check("email", "email is required").not().isEmpty(),
  check("password", "password is required").not().isEmpty(),
  check('password', 'The password needs to be least 6 characters long').isLength({ min: 6 }),
  validations
];

module.exports = validateUserData;