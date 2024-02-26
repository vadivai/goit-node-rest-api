const {
  register,
  login,
  getCurrent,
  logout,
  updateAvatar,
} = require("../controllers/auth");
const { authenticate, validateBody, upload } = require("../middlewares");
const { schemas } = require("../models");

const express = require("express");

const authRouter = express.Router();

authRouter.post("/register", validateBody(schemas.registerSchema), register);

// authRouter.post("/verify/:verificationCode", verifyEmail);

authRouter.post("/login", validateBody(schemas.loginSchema), login);

authRouter.get("/current", authenticate, getCurrent);

authRouter.post("/logout", authenticate, logout);

authRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  updateAvatar
);

module.exports = authRouter;
