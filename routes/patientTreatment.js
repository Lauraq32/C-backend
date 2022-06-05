const { Router } = require('express');
const { check } = require('express-validator');
const {validations} = require("../middlewares/validations");
const {jwtValidations} = require("../middlewares/jwt-validations");
const {AdminRole} = require("../middlewares/role-validation");
const {cuotaPost, cuotaGet, cuotaGetById,  treatmentPut, treatmentDelete} = require("../controllers/patientTreatment");

const router = Router();

router.post('/nuevo', [
  check('treatmentId', 'treatment is required').not().isEmpty(),
  check('clientId', 'client is required').not().isEmpty(),
  validations
], cuotaPost);

router.get('/cuota', [
    jwtValidations,
    validations
], cuotaGet);

router.get('/cuota/:id', [
    jwtValidations,
    validations
], cuotaGetById);

router.put('/update/:id',[
  jwtValidations,
  AdminRole,
  check('id', 'is not a valid ID').isMongoId(),
  validations
], treatmentPut);

router.delete('/delete/:id', [
  jwtValidations,
  AdminRole,
  check('id', 'is not a valid ID').isMongoId(),
  validations
], treatmentDelete);


module.exports = router;
