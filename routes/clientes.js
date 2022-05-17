const { Router } = require('express');
const { check } = require('express-validator');

const { 
        clientesDelete,
        clientesPut,
        clientesPost,
        clientsGet,
        tablaGet } = require('../controllers/clientes');
const { validations } = require("../middlewares/validations");
const {user} = require("../helpers/dbValidators");
const {jwtValidations} = require("../middlewares/jwt-validations");

const router = Router();

router.post("/nuevo",[
  check('paciente', 'paciente is required').not().isEmpty(),
  check('email', 'email is required').not().isEmpty(),
  check('numeromovil', 'numeromovil is required').not().isEmpty(),
  validations
], clientesPost);

router.get('/todos', [
    jwtValidations,
    //check('id', 'is not a valid ID').isMongoId(),
    validations
], clientsGet);

router.get('/prueba/:id', [
    jwtValidations,
    //check('id', 'is not a valid ID').isMongoId(),
    validations
], tablaGet);

router.put('/update/:id',[
    jwtValidations,
    check('id', 'is not a valid ID').isMongoId(),
    //check('id').custom(user),
    validations
], clientesPut);

router.delete('/delete/:id', [
    jwtValidations,
    check('id', 'is not a valid ID').isMongoId(),
    //check('id').custom(user),
    validations
], clientesDelete);

module.exports = router;