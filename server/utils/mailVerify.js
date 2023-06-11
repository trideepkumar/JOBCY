require('dotenv').config();
const nodemailer = require('nodemailer');
const getHTML = require('../templates/email');

const sendVerificationEmail = async (email, verificationUrl) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
    tls: {
      ciphers:'SSLv3'
  }
  });

  const mailOptions = {
    from: `"JOBCY JOB WEB PORTAL : FIND AND POST YOUR PERFECT JOBS HERE" <${process.env.EMAIL}>`,
    to: email,
    subject: ' Email Verification ✔️  Do not reply!',

    html: getHTML(verificationUrl),
  };


  try {
    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (error) {
    console.log(error);
    throw new Error('Error sending verification email');
  }
};

module.exports = sendVerificationEmail;


