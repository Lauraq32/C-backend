const { Router } = require('express');
const { check } = require('express-validator');

const { doctorasGet,
        doctorasDelete,
        doctorasPut,
        doctorasPost,
        doctoraGet,
        GetReservationByDate } = require('../controllers/doctoras');
const { validations } = require("../middlewares/validations");
const {jwtValidations} = require("../middlewares/jwt-validations");

const router = Router();

router.post("/doctora",[
  check('doctora', 'doctora is required').not().isEmpty(),
  check('numeromovil', 'numeromovil is required').not().isEmpty(),
  //check('totaldeganancias', 'totaldeganancias is required').not().isEmpty(),
  validations
], doctorasPost);

router.get('/ganancias', [
    jwtValidations,
    // check('id', 'is not a valid ID').isMongoId(),
    validations
], doctorasGet);

router.get('/ganancias/:id', [
    jwtValidations,
    // check('id', 'is not a valid ID').isMongoId(),
    validations
], doctoraGet);

router.get('/date/:id', [
    jwtValidations,
    // check('id', 'is not a valid ID').isMongoId(),
    validations
], GetReservationByDate);

router.put('/update/:id',[
    jwtValidations,
    check('id', 'is not a valid ID').isMongoId(),
    //check('id').custom(user),
    validations
], doctorasPut);

router.delete('/delete/:id', [
    jwtValidations,
    check('id', 'is not a valid ID').isMongoId(),
    //check('id').custom(user),
    validations
], doctorasDelete);

module.exports = router;