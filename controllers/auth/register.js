const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const { httpError, sendEmail } = require("../../helpers");
const { User } = require("../../models");
const nanoid = require("nanoid");
require("dotenv").config();
const { BASE_URL } = process.env;

const register = async (req, res) => {
  const { email, password, subscription } = req.body; // почему не активное? строку subscription: newUser.subscription, переписать?
  const user = await User.findOne({ email });
  if (user) {
    throw httpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const avatarURL = gravatar.url(email);

  const verificationCode = nanoid();

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    verificationCode,
  });

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="${BASE_URL}/users/verify/${verificationCode}">Please, click here to verify email</a>`,
  };
  await sendEmail(verifyEmail);

  res.status(201).json({
    email: newUser.email,
    subscription: newUser.subscription,
  });
};

module.exports = register;
