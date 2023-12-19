const nodemailer = require("nodemailer");
require("dotenv").config();

const { META_LOGIN, META_PASSWORD } = process.env;

const config = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: META_LOGIN,
    pass: META_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(config);

const sendEmail = async (data) => {
  const email = { ...data, from: META_LOGIN };
  await transporter.sendMail(email);
  return true;
};

module.exports = sendEmail;
