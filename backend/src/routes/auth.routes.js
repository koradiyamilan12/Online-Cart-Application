const express = require("express");

const { register, login, logout, profile } = require("../controllers/auth.controller");
const authenticate = require("../middleware/auth.middleware");
const validateBody = require("../middleware/validate.middleware");
const { registerSchema, loginSchema } = require("../validations/auth.validation");

const router = express.Router();

router.post("/register", validateBody(registerSchema), register);
router.post("/login", validateBody(loginSchema), login);
router.post("/logout", logout);
router.get("/profile", authenticate, profile);
router.get("/me", authenticate, profile);

module.exports = router;
