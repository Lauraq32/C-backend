const { Router } = require('express');
const { check } = require('express-validator');

const { 
        clientesDelete,
        clientesPut,
        clientesPost,
        clientsGet,
        tablaGet } = require('../controllers/client');
const { validations } = require("../middlewares/validations");
const {jwtValidations} = require("../middlewares/jwt-validations");

const router = Router();

router.post("/nuevo",[
  check('patient', 'patient is required').not().isEmpty(),
  check('email', 'email is required').not().isEmpty(),
  check('phone', 'numeromovil is required').not().isEmpty(),
  validations
], clientesPost);

router.get('/todos', [
    jwtValidations,
    validations
], clientsGet);

router.get('/prueba/:id', [
    jwtValidations,
    check('id', 'is not a valid ID').isMongoId(),
    validations
], tablaGet);

router.put('/update/:id',[
    jwtValidations,
    check('id', 'is not a valid ID').isMongoId(),
    validations
], clientesPut);

router.delete('/delete/:id', [
    jwtValidations,
    check('id', 'is not a valid ID').isMongoId(),
    validations
], clientesDelete);

module.exports = router;