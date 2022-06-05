const { Router } = require('express');
const { check } = require('express-validator');
const {validations} = require("../middlewares/validations");
const {jwtValidations} = require("../middlewares/jwt-validations");
const {AdminRole} = require("../middlewares/role-validation");
const {tratamientoPost, tratamientoGet, tratamientoDelete, tratamientoPut} = require("../controllers/treatment");

const router = Router();

router.post('/nuevo', [
  check('treatment', 'treatment is required').not().isEmpty(),
  check('total', 'total is required').not().isEmpty(),
  validations
], tratamientoPost);

router.get('/info/:id', [
  jwtValidations,
  check('id', 'is not a valid ID').isMongoId(),
  validations
], tratamientoGet);

router.delete('/delete/:id', [
  jwtValidations,
  AdminRole,
  check('id', 'is not a valid ID').isMongoId(),
  validations
], tratamientoDelete);

router.put('/update/:id',[
  jwtValidations,
  AdminRole,
  check('id', 'is not a valid ID').isMongoId(),
  validations
], tratamientoPut);

module.exports = router;
