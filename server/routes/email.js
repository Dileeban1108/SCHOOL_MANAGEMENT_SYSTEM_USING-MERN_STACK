const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();
require('dotenv').config();

console.log('EMAIL_USER:', process.env.EMAIL_USER);
console.log('EMAIL_PASS:', process.env.EMAIL_PASS);

router.post('/sendEmail', async (req, res) => {
  const { email, message } = req.body;

  if (!email || !message) {
    return res.status(400).send({ message: 'Email and message are required' });
  }

  let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  let mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Message from your doctor',
    text: message,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send({ message: 'Failed to send email' });
  }
});

module.exports = router;
