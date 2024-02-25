const { register, login, getCurrent, logout } = require("../controllers/auth");
const { authenticate, validateBody } = require("../middlewares");
const { schemas } = require("../models");

const express = require("express");

const authRouter = express.Router();

authRouter.post("/register", validateBody(schemas.registerSchema), register);

authRouter.post("/login", validateBody(schemas.loginSchema), login);

authRouter.get("/current", authenticate, getCurrent);

authRouter.post("/logout", authenticate, logout);

module.exports = authRouter;
