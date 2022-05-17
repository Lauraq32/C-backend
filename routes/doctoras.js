const { Router } = require('express');
const { check } = require('express-validator');

const { doctorasGet,
        doctorasDelete,
        doctorasPut,
        doctorasPost } = require('../controllers/doctoras');
const { validations } = require("../middlewares/validations");
const {user} = require("../helpers/dbValidators");
const {jwtValidations} = require("../middlewares/jwt-validations");

const router = Router();

router.post("/doctora",[
  check('doctora', 'doctora is required').not().isEmpty(),
  check('numeromovil', 'numeromovil is required').not().isEmpty(),
  //check('totaldeganancias', 'totaldeganancias is required').not().isEmpty(),
  validations
], doctorasPost);

router.get('/information', [
    jwtValidations,
    // check('id', 'is not a valid ID').isMongoId(),
    validations
], doctorasGet);

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