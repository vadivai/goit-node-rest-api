const nodemailer = require("nodemailer");
require("dotenv").config();
const { META_PASSWORD } = process.env;

const sendEmail = async (data) => {
  const nodemailerConfig = {
    host: "smtp.meta.ua",
    port: 465,
    secure: true,
    auth: {
      user: "vadim@meta.ua",
      pass: META_PASSWORD,
    },
  };

  const transport = nodemailer.createTransport(nodemailerConfig);

  const email = { ...data, from: "vadim@meta.ua" };

  await transport
    .sendMail(email)
    .then(() => {
      console.log("Email send success");
    })
    .catch((err) => {
      console.log(err.message);
    });

  return true;
};

module.exports = sendEmail;
