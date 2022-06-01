const { Router } = require('express');
const { check } = require('express-validator');
const {validations} = require("../middlewares/validations");
const {jwtValidations} = require("../middlewares/jwt-validations");
const {cuotaPost, cuotaGet, cuotaGetById} = require("../controllers/patientTreatment");

const router = Router();

router.post('/nuevo', [
  check('treatmentId', 'treatment is required').not().isEmpty(),
  check('clientId', 'client is required').not().isEmpty(),
  validations
], cuotaPost);

router.get('/cuota/info', [
    jwtValidations,
    validations
], cuotaGet);

router.get('/cuota/:id', [
    jwtValidations,
    validations
  ], cuotaGetById);


module.exports = router;
