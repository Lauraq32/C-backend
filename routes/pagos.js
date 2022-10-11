const { Router } = require("express");
const checkId = require("../middlewares/checkId");
const { AdminRole } = require("../middlewares/role-validation");
const { jwtValidations } = require("../middlewares/jwt-validations");
const PagoController = require("../controllers/PagoController");

// base path: api/doctors
const router = Router();

router.use(jwtValidations);

const checkAdminRoleAndId = () => [AdminRole, checkId()];

// read operations
router.get("/", PagoController.getAll);

// write operations
router.post("/", PagoController.post);
router.put("/:id", checkAdminRoleAndId(), PagoController.put);
// router.delete("/:id", checkAdminRoleAndId(), DoctorController.delete);

module.exports = router;