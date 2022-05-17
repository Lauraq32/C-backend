const { Router } = require('express');
const { check } = require('express-validator');

const { productosGet,
        productosDelete,
        productosPut,
        productosPost,
        productsGet } = require('../controllers/productos');
const { validations } = require("../middlewares/validations");
const {user} = require("../helpers/dbValidators");
const {jwtValidations} = require("../middlewares/jwt-validations");

const router = Router();

router.post("/almacen",[
  check('productos', 'producto is required').not().isEmpty(),
  check('cantidad', 'cantidad is required').not().isEmpty(),
  check('precio', 'precio is required').not().isEmpty(),
  validations
], productosPost);

router.get('/cantidad/:id', [
    jwtValidations,
    check('id', 'is not a valid ID').isMongoId(),
    validations
], productosGet);

router.get('/todos', [
    jwtValidations,
    validations
], productsGet);

router.put('/actualizar/:id',[
    //jwtValidations,
    check('id', 'is not a valid ID').isMongoId(),
    //check('id').custom(user),
    validations
], productosPut);

router.delete('/borrar/:id', [
    jwtValidations,
    check('id', 'is not a valid ID').isMongoId(),
    //check('id').custom(user),
    validations
], productosDelete);

module.exports = router;