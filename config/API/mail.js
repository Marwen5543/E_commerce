const nodemailer = require('nodemailer');

// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  service: 'Gmail', // Use your email service provider
  auth: {
    user: 'marwen.mamlouk@esprit.tn', // Your email address
    pass: 'iopcfremikvtvyqm', // Your email password
  },
});

// Email data
const mailOptions = {
  from: 'your-email@gmail.com',
  to: 'marwen.mamlouk@esprit.tn', // Recipient's email address
  subject: 'Hello from Node.js',
  text: 'This is a test email sent from Node.js.',
};

// Send email
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error('Error sending email:', error);
  } else {
    console.log('Email sent:', info.response);
  }
});
