require('dotenv').config();
const nodemailer = require('nodemailer');
const getHTML = require('../templates/email');

const sendJobMail = async (email,userEmail, subject,body) => {
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
    from:email,
    to: userEmail,
    subject:subject,
    body:getHTML(body),
  };


  try {
    const info = await transporter.sendMail(mailOptions);
    return info
  } catch (error) {
    console.log(error);
    throw new Error('Error sending verification email')
  }
};

module.exports = sendJobMail;


