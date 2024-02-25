const { register, login, getCurrent, logout } = require("../controllers/auth");
const authenticate = require("../helpers/authenticate");
const validateBody = require("../helpers/validateBody");

const { schemas } = require("../models/user");

const express = require("express");

const router = express.Router();

router.post("/register", validateBody(schemas.registerSchema), register);

router.post("/login", validateBody(schemas.loginSchema), login);

router.get("/current", authenticate, getCurrent);

router.post("/logout", authenticate, logout);

module.exports = router;
