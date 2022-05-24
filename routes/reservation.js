const { Router } = require('express');
const { check } = require('express-validator');

const { reservationGet,
        reservationDelete,
        reservationPut,
        reservationPost,
        tablaGet } = require('../controllers/reservation');
const { validations } = require("../middlewares/validations");
const {user} = require("../helpers/dbValidators");
const {jwtValidations} = require("../middlewares/jwt-validations");

const router = Router();

router.post("/paciente",[
  //check('numeromovil', 'numeromovil is required').not().isEmpty(),
  //check('montoapagar', 'montoapagar is required').not().isEmpty(),
  check('tipodepago', 'tipodepago is required').not().isEmpty(),
  check('doctoraId', 'doctoraId is required').not().isEmpty(),
  check('clienteId', 'clienteId is required').not().isEmpty(),
  check('tratamientoPacienteId', 'tratamientoId is required').not().isEmpty(),
  //check('porciento', 'porciento is required').not().isEmpty(),
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
    check('id', 'is not a valid ID').isMongoId(),
    //check('id').custom(user),
    validations
], reservationPut);

router.delete('/delete/:id', [
    jwtValidations,
    check('id', 'is not a valid ID').isMongoId(),
    //check('id').custom(user),
    validations
], reservationDelete);

module.exports = router;