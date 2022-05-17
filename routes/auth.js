const { Router } = require('express');
const { check } = require('express-validator');
const {validations} = require("../middlewares/validations");
const {Login, usersPost} = require("../controllers/users");
const {emailValidation} = require("../helpers/dbValidators");

const router = Router();

router.post('/login', [
  check('email', 'email is not valid').isEmail(),
  check('password', 'password is required').not().isEmpty(),
  validations
], Login);

router.post("/signup",[
  check('name', 'name is required').not().isEmpty(),
  check('lastname', 'lastname is required').not().isEmpty(),
  check('rol', 'rol is required').not().isEmpty(),
  check('password', 'password is required').not().isEmpty(),
  check('email').custom(emailValidation),
  validations
], usersPost);

module.exports = router;
