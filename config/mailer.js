const nodemailer = require("nodemailer");
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: "Outlook365", // Pour Outlook.com, utilisez "Outlook365"
    auth: {
      user: process.env.MAILER_EMAIL, // Remplacez par votre adresse e-mail Outlook
      pass: process.env.MAILER_SECRET, // Remplacez par le mot de passe de votre e-mail Outlook
    },
  });
module.exports = transporter;
