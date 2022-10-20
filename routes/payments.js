const { Router } = require("express");
const checkId = require("../middlewares/checkId");
const { AdminRole } = require("../middlewares/role-validation");
const { jwtValidations } = require("../middlewares/jwt-validations");
const PaymentController = require("../controllers/PaymentController");

// base path: api/doctors
const router = Router();

router.use(jwtValidations);

const checkAdminRoleAndId = () => [AdminRole, checkId()];

// read operations
router.get("/list", PaymentController.getAll);

// write operations
router.post("/", PaymentController.post);
router.put("/:id", checkAdminRoleAndId(), PaymentController.put);
// router.delete("/:id", checkAdminRoleAndId(), DoctorController.delete);

module.exports = router;