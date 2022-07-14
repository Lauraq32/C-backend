const { Router } = require("express");
const checkId = require("../middlewares/checkId");
const { validations } = require("../middlewares/validations");
const { AdminRole } = require("../middlewares/role-validation");
const { jwtValidations } = require("../middlewares/jwt-validations");
const PatientController = require("../controllers/PatientController");
const validateNewPatient = require("../validators/validateNewPatient");

// base path: api/patients
const router = Router();

router.use(jwtValidations);

const checkAdminRoleAndId = () => [AdminRole, checkId()];

// read operations
router.get("/", PatientController.getAll);
router.get("/:id", checkId(), PatientController.get);

// write operations
router.post("/", validateNewPatient, PatientController.post);
router.put("/:id", checkAdminRoleAndId(), PatientController.put);
router.delete("/:id", checkAdminRoleAndId(), PatientController.delete);

router.use(validations);

module.exports = router;
