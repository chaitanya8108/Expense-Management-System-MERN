const transporter = require("../config/nodemailerConfig");

const sendEmail = async (req, res) => {
  const { name, email, message } = req.body;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: "recipient-email@example.com", // Replace with the recipient's email address
    subject: `Message from ${name}`,
    text: `From: ${name} (${email})\n\n${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send({ message: "Failed to send email." });
  }
};

module.exports = { sendEmail };
