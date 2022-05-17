const { Router } = require('express');
const { check } = require('express-validator');
const {validations} = require("../middlewares/validations");
const {tratamientoPost} = require("../controllers/tratamiento");

const router = Router();

router.post('/nuevo', [
  check('tratamiento', 'tratamiento is required').not().isEmpty(),
  check('total', 'total is required').not().isEmpty(),
  validations
], tratamientoPost);

module.exports = router;
