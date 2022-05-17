const { Router } = require('express');
const { check } = require('express-validator');
const {
    usersGet,
    usersDelete,
    usersPut 
} = require('../controllers/users');
const { validations } = require("../middlewares/validations");
const {user} = require("../helpers/dbValidators");
const {jwtValidations} = require("../middlewares/jwt-validations");

const router = Router();


router.get('/profile/:id', [
    jwtValidations,
    check('id', 'is not a valid ID').isMongoId(),
    validations
], usersGet);

router.put('/profile/:id',[
    jwtValidations,
    check('id', 'is not a valid ID').isMongoId(),
    check('id').custom(user),
    validations
], usersPut);

router.delete('/:id', [
    jwtValidations,
    check('id', 'is not a valid ID').isMongoId(),
    check('id').custom(user),
    validations
], usersDelete);

module.exports = router;