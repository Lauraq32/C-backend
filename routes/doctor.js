const { Router } = require('express');
const { check } = require('express-validator');

const { doctorasGet,
        doctorasDelete,
        doctorasPut,
        doctorasPost,
        doctoraGet } = require('../controllers/doctor');
        const { GetEarningsByDate } = require('../controllers/reservation');
const { validations } = require("../middlewares/validations");
const {jwtValidations} = require("../middlewares/jwt-validations");

const router = Router();

router.post("/doctora",[
  check('doctor', 'doctor is required').not().isEmpty(),
  check('phone', 'phone is required').not().isEmpty(),
  validations
], doctorasPost);

router.get('/ganancias', [
    jwtValidations,
    validations
], doctorasGet);

router.get('/porciento', [
    jwtValidations,
    validations
], GetEarningsByDate);

router.get('/ganancias/:id', [
    jwtValidations,
    check('id', 'is not a valid ID').isMongoId(),
    validations
], doctoraGet);

router.put('/update/:id',[
    jwtValidations,
    check('id', 'is not a valid ID').isMongoId(),
    validations
], doctorasPut);

router.delete('/delete/:id', [
    jwtValidations,
    check('id', 'is not a valid ID').isMongoId(),
    validations
], doctorasDelete);

module.exports = router;