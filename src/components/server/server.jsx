const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

let otpStorage = {}; // Store OTPs temporarily

const transporter = nodemailer.createTransport({
  service: 'gmail', // You can use any email service
  auth: {
    user: 'your-email@gmail.com', // Your email
    pass: 'your-email-password' // Your email password or app-specific password
  }
});

const generateOtp = () => {
  return Math.floor(1000 + Math.random() * 9000).toString();
};

app.post('/send-otp', (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  const otp = generateOtp();
  otpStorage[email] = otp; // Store OTP

  const mailOptions = {
    from: 'your-email@gmail.com',
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP code is ${otp}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending OTP:', error);
      return res.status(500).json({ error: 'Failed to send OTP' });
    }
    console.log('OTP sent:', info.response);
    res.status(200).json({ message: 'OTP sent successfully' });
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
