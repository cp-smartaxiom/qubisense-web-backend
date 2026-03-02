require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

app.post('/send-mail', async (req, res) => {


  const { name, contact, email, message } = req.body;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: 'cppatidar112@gmail.com',
      subject: 'New Contact Form Submission',
      html: `
        <h2>New Form Submission</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Contact:</b> ${contact}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Message:</b> ${message}</p>
      `,
    });

    res.json({ success: true, message: 'Email Sent Successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Email Failed' });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});