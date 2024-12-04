const nodemailer = require("nodemailer");
require("dotenv").config(); // Make sure this is at the top of your file

// Create a transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Your email (use App Password if 2FA is enabled)
    pass: process.env.EMAIL_PASS, // Your Gmail password or App Password
  },
});

// Define mail options
const mailOptions = {
  from: process.env.EMAIL_USER, // Sender's email
  to: "chaitanya81082430@gmail.com", // Recipient's email
  subject: "Test Email using Nodemailer",
  text: "This is a test email sent using Nodemailer.",
};

// Send mail
// transporter.sendMail(mailOptions, (error, info) => {
//   if (error) {
//     console.log("Error sending email:", error);
//   } else {
//     console.log("Email sent successfully:", info.response);
//   }
// });
