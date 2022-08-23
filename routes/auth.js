const { Router } = require("express");
const { validations } = require("../middlewares/validations");
const { AdminRole } = require("../middlewares/role-validation");
const UserController = require("../controllers/UserController");
const validateSignup = require("../validators/validateSignup");
const validateLogin = require("../validators/validateLogin");

// base path: api/users
const router = Router();

// check for role
const checkAdminRole = () => [AdminRole];

// write operations
router.post("/signup", checkAdminRole(), validateSignup, UserController.post);
router.post("/login", validateLogin, UserController.login);

router.use(validations);

module.exports = router;
