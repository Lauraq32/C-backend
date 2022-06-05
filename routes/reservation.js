const { Router } = require('express');
const { check } = require('express-validator');

const { reservationGet,
        reservationDelete,
        reservationPut,
        reservationPost,
        tablaGet } = require('../controllers/reservation');
const { validations } = require("../middlewares/validations");
const {jwtValidations} = require("../middlewares/jwt-validations");
const {AdminRole} = require("../middlewares/role-validation");

const router = Router();

router.post("/paciente",[
  check('concept', 'concept is required').not().isEmpty(),
  check('phone', 'phone is required').not().isEmpty(),
  check('amountpayable', 'amountpayable is required').not().isEmpty(),
  check('paymenttype', 'paymenttype is required').not().isEmpty(),
  check('doctorId', 'doctorId is required').not().isEmpty(),
  check('clientId', 'clientId is required').not().isEmpty(),
  check('patientTreatmentId', 'patientTreatmentId is required').not().isEmpty(),
  validations
], reservationPost);

router.get('/information/:id', [
    jwtValidations,
    check('id', 'is not a valid ID').isMongoId(),
    validations
], tablaGet);

router.get('/todos', [
    jwtValidations,
    validations
], reservationGet);

router.put('/update/:id',[
    jwtValidations,
    AdminRole,
    check('id', 'is not a valid ID').isMongoId(),
    validations
], reservationPut);

router.delete('/delete/:id', [
    jwtValidations,
    AdminRole,
    check('id', 'is not a valid ID').isMongoId(),
    validations
], reservationDelete);

module.exports = router;