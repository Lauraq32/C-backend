const { Router } = require('express');
const { check } = require('express-validator');

const { productosGet,
        productosDelete,
        productosPut,
        productosPost,
        productsGet } = require('../controllers/product');
const { validations } = require("../middlewares/validations");
const {jwtValidations} = require("../middlewares/jwt-validations");
const {AdminRole} = require("../middlewares/role-validation");

const router = Router();

router.post("/almacen",[
  check('products', 'products is required').not().isEmpty(),
  check('amount', 'amount is required').not().isEmpty(),
  check('price', 'price is required').not().isEmpty(),
  validations
], productosPost);

router.get('/cantidad/:id', [
    jwtValidations,
    AdminRole,
    check('id', 'is not a valid ID').isMongoId(),
    validations
], productosGet);

router.get('/todos', [
    jwtValidations,
    AdminRole,
    validations
], productsGet);

router.put('/actualizar/:id',[
    jwtValidations,
    AdminRole,
    check('id', 'is not a valid ID').isMongoId(),
    validations
], productosPut);

router.delete('/borrar/:id', [
    jwtValidations,
    AdminRole,
    check('id', 'is not a valid ID').isMongoId(),
    validations
], productosDelete);

module.exports = router;